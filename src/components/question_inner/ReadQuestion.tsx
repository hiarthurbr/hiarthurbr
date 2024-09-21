import {
  Speaker,
  SpeakerMute,
  LowPitch,
  LowVelocity,
  HighPitch,
  HighVelocity,
  Play,
  Pause,
  Stop,
  Menu,
  Circle,
  Triangle,
  Square,
  Diamond,
  Reload,
} from "@components/svgs";
import {
  PITCH_KEY,
  READ_KEY,
  SPEECH_RATE_KEY,
  VOICE_KEY,
  VOLUME_KEY,
} from "@lib/const";
import { findSimilarValue } from "@lib/natural";
import {
  Button,
  Tooltip,
  Slider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Divider,
  Progress,
  Select,
  Tabs,
  Tab,
  Checkbox,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { match } from "ts-pattern";

type Voice = {
  uri: string;
  lang: string;
  name: string;
};

function mapToVoice(voice: SpeechSynthesisVoice): Voice {
  return {
    uri: voice.voiceURI,
    lang: voice.lang,
    name: voice.name,
  };
}

function isVoice(voice: object): voice is Voice {
  return "uri" in voice && "lang" in voice && "name" in voice;
}

const language_filter = ["pt-BR", "en-US", "es-ES"];

const language_answer_map = {
  "pt-BR": {
    circle: "Alternativa Círculo",
    square: "Alternativa Quadrado",
    triangle: "Alternativa Triângulo",
    diamond: "Alternativa Losango",
  },
  "en-US": {
    circle: "Circle Option",
    square: "Square Option",
    triangle: "Triangle Option",
    diamond: "Diamond Option",
  },
  "es-ES": {
    circle: "Opción Círculo",
    square: "Opción Cuadrado",
    triangle: "Opción Triángulo",
    diamond: "Opción Diamante",
  },
};

export function ReadQuestion({
  text,
  language,
  answers,
}: {
  text: string;
  language: string;
  answers: {
    circle: string;
    square: string;
    triangle: string;
    diamond: string;
  };
  children?: never;
}) {
  const [synth, setSynth] = useState<SpeechSynthesis | undefined>(undefined);
  const [volume, setVolume] = useState<number | undefined>(undefined);
  const [pitch, setPitch] = useState<number | undefined>(undefined);
  const [rate, setRate] = useState<number | undefined>(undefined);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState<Voice | undefined>(undefined);
  const [read, setRead] = useState<string | undefined>(undefined);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [progress, setProgress] = useState(0);

  const [selectOpen, setSelectOpen] = useState(false);
  const [buttonInvalid, setButtonInvalid] = useState(false);

  const utterance = useRef<SpeechSynthesisUtterance | null>(null);

  useLayoutEffect(() => {
    if (volume == null) {
      const volume = localStorage.getItem(VOLUME_KEY);
      if (volume != null) setVolume(Number(volume));
      else setVolume(75);
    } else {
      if (utterance.current) utterance.current.volume = volume / 100;
      localStorage.setItem(VOLUME_KEY, volume.toString());
    }
  }, [volume]);

  useLayoutEffect(() => {
    if (pitch == null) {
      const pitch = localStorage.getItem(PITCH_KEY);
      if (pitch != null) setPitch(Number(pitch));
      else setPitch(1);
    } else {
      if (utterance.current) utterance.current.pitch = pitch;
      localStorage.setItem(PITCH_KEY, pitch.toString());
    }
  }, [pitch]);

  useLayoutEffect(() => {
    if (rate == null) {
      const rate = localStorage.getItem(SPEECH_RATE_KEY);
      if (rate != null) setRate(Number(rate));
      else setRate(1);
    } else {
      if (utterance.current) utterance.current.rate = rate;
      localStorage.setItem(SPEECH_RATE_KEY, rate.toString());
    }
  }, [rate]);

  useLayoutEffect(() => {
    if (read == null) {
      const read = localStorage.getItem(READ_KEY);
      if (read != null) setRead(read);
      else setRead("question");
    } else {
      const tts = match(read)
        .with("circle", () => answers.circle)
        .with("square", () => answers.square)
        .with("triangle", () => answers.triangle)
        .with("diamond", () => answers.diamond)
        .with("question", () => text)
        .otherwise(() => {
          const map =
            language_answer_map[language as keyof typeof language_answer_map];
          return [
            text,
            `${map.circle}) ${answers.circle}`,
            `${map.square}) ${answers.square}`,
            `${map.triangle}) ${answers.triangle}`,
            `${map.diamond}) ${answers.diamond}`,
          ].join("\n");
        });
      if (utterance.current) utterance.current.text = tts;
      localStorage.setItem(READ_KEY, read);
    }
  }, [read, answers, text, language]);

  useLayoutEffect(() => {
    if (!voice) return;
    const speech = voices.find((v) => v.voiceURI === voice.uri);
    if (!speech) return;
    if (utterance.current) utterance.current.voice = speech;
  }, [voice, voices]);

  useLayoutEffect(() => {
    if (synth) setVoices(synth.getVoices());
    else if ("speechSynthesis" in window) setSynth(window.speechSynthesis);
  }, [synth]);

  useLayoutEffect(() => {
    if (!voices.length) return;
    if (!voice) {
      const selectedVoice = localStorage.getItem(VOICE_KEY);
      if (selectedVoice) {
        try {
          const voice = JSON.parse(selectedVoice);
          if (!isVoice(voice)) throw null;

          setVoice(voice);
          return;
        } catch {
          localStorage.removeItem(VOICE_KEY);
        }
      }
      const locales = Array.from(new Set(voices.map((v) => v.lang)));
      const closestMatch = findSimilarValue(language, locales);
      if (closestMatch)
        setVoice(mapToVoice(voices.find((v) => v.lang === closestMatch)!));
      else setVoice(mapToVoice(voices[0]));
    } else localStorage.setItem(VOICE_KEY, JSON.stringify(voice));
  }, [voices, voice, language]);

  useEffect(() => {
    utterance.current = new SpeechSynthesisUtterance(text);
    utterance.current.onpause = () => setIsPlaying(false);
    utterance.current.onresume = () => setIsPlaying(true);
    utterance.current.onstart = () => {
      setIsPlaying(true);
      setIsStopped(false);
      setProgress(0);
    };
    utterance.current.onend = () => {
      setIsPlaying(false);
      setIsStopped(true);
      setProgress(0);
    };
    utterance.current.onboundary = (e) => console.log(e);
  }, [text]);

  const selectedVoice: Voice | null = useMemo(() => {
    const item = globalThis?.localStorage?.getItem(VOICE_KEY);

    if (item) {
      try {
        const voice = JSON.parse(item);
        if (isVoice(voice)) {
          return voice;
        }
      } catch (e) {}
    }

    return null;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: should update when voice changes
  const voice_exist = useMemo(
    () =>
      selectedVoice != null &&
      voices.findIndex((voice) => selectedVoice.uri === voice.voiceURI) !== -1,
    [selectedVoice, voices, voice],
  );

  const selectElement = useMemo(() => {
    const voice_list = voices
      .filter((voice) => language_filter.includes(voice.lang))
      .map((voice) => (
        <SelectItem
          key={voice.voiceURI}
          value={voice.voiceURI}
          textValue={voice.name}
        >
          {voice.name}
        </SelectItem>
      ));

    return (
      <Select
        label="Voz"
        labelPlacement="outside"
        selectedKeys={voice ? [voice.uri] : []}
        onChange={(e) => {
          const selected = voices.find((v) => v.voiceURI === e.target.value);
          if (selected) {
            setVoice(mapToVoice(selected));
          } else setVoice(undefined);
        }}
        isInvalid={!voice || !voices.find((v) => voice.uri === v.voiceURI)}
        errorMessage={
          voice ? "Esta voz não está mais disponível." : "Selecione uma voz."
        }
        isOpen={selectOpen}
        onOpenChange={(open) => open !== selectOpen && setSelectOpen(open)}
        isDisabled={!isStopped}
        isRequired
      >
        {!voice_exist && selectedVoice != null
          ? [
              <SelectItem
                key={selectedVoice.uri}
                value={selectedVoice.uri}
                textValue={selectedVoice.name}
              >
                {selectedVoice.name}
              </SelectItem>,
              ...voice_list,
            ]
          : voice_list}
      </Select>
    );
  }, [selectOpen, selectedVoice, voice, voices, voice_exist, isStopped]);

  const errorWarning = useMemo(() => {
    if (
      pitch == null ||
      volume == null ||
      rate == null ||
      voice == null ||
      !voice_exist
    ) {
      const errors = [];

      if (pitch == null) errors.push("tom");
      if (volume == null) errors.push("volume");
      if (rate == null) errors.push("velocidade");
      if (voice == null) errors.push("voz");
      if (!voice_exist) errors.push("voz selecionada");

      return (
        <p className="text-small text-default-400">
          Para iniciar a leitura, configure o/a {errors.join(", ")}
        </p>
      );
    }

    return null;
  }, [pitch, volume, rate, voice, voice_exist]);

  return (
    <Popover placement="bottom-end" shouldFlip>
      <PopoverTrigger>
        <Button
          color={isStopped ? "primary" : isPlaying ? "secondary" : "warning"}
          variant={isPlaying ? "shadow" : isStopped ? "ghost" : "flat"}
          className="p-1"
          startContent={<Speaker />}
          isDisabled={synth == null}
          isIconOnly
        />
      </PopoverTrigger>
      <PopoverContent>
        {voices.length ? (
          <div className="flex flex-col min-w-[90vw] sm:min-w-96 gap-2 px-4 py-2">
            <div className="flex flex-row items-center gap-2">
              <span className="font-semibold text-medium">Ler</span>
              <Tabs
                isDisabled={!isStopped || read?.endsWith(":all")}
                selectedKey={read}
                onSelectionChange={(key) =>
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  !read?.endsWith(":all") && setRead(key as any)
                }
              >
                <Tab key="question" title="Questão" />
                <Tab
                  key="circle"
                  title={<Circle className="fill-foreground-900" />}
                />
                <Tab
                  key="triangle"
                  title={<Triangle className="fill-foreground-900" />}
                />
                <Tab
                  key="square"
                  title={<Square className="fill-foreground-900" />}
                />
                <Tab
                  key="diamond"
                  title={<Diamond className="fill-foreground-900 scale-125" />}
                />
              </Tabs>
              <Checkbox
                isDisabled={!isStopped}
                isSelected={read?.endsWith(":all")}
                onValueChange={(checked) => {
                  checked
                    ? setRead(`${read}:all`)
                    : setRead(read?.replace(":all", ""));
                }}
              >
                Todos
              </Checkbox>
            </div>
            <Divider />
            <Slider
              label="Volume"
              color="foreground"
              startContent={<SpeakerMute className="size-6" />}
              endContent={<Speaker className="size-6" />}
              minValue={0}
              maxValue={100}
              value={volume}
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              onChange={setVolume as any}
              isDisabled={!isStopped}
            />
            <Divider />
            <Slider
              label="Tom"
              color="warning"
              startContent={<LowPitch className="size-6" />}
              endContent={<HighPitch className="size-6" />}
              minValue={0}
              maxValue={2}
              fillOffset={1}
              step={0.1}
              value={pitch}
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              onChange={setPitch as any}
              isDisabled={!isStopped}
              showSteps
            />
            <Divider />
            <Slider
              label="Ritmo"
              color="secondary"
              startContent={<LowVelocity className="size-6" />}
              endContent={<HighVelocity className="size-6" />}
              minValue={0.1}
              maxValue={10}
              fillOffset={1}
              value={rate}
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              onChange={setRate as any}
              isDisabled={!isStopped}
              step={0.1}
            />
            <Divider />
            <div className="flex flex-row items-start gap-2">
              {selectElement}
              <Button
                className="p-1.5 mt-6"
                startContent={<Menu />}
                onPress={() => setSelectOpen(!selectOpen)}
                aria-pressed={selectOpen}
                isDisabled={!isStopped}
                isIconOnly
              />
            </div>
            <Divider />
            {!isStopped && (
              <p className="text-small text-default-400">
                Para alterar as configurações, pare a leitura.
              </p>
            )}
            {errorWarning}
            <div className="flex flex-row items-center gap-2">
              <Tooltip
                content={isPlaying ? "Pausar" : "Reproduzir"}
                placement="top"
              >
                <Button
                  size="sm"
                  className="p-1.5"
                  color={
                    buttonInvalid ? "danger" : isPlaying ? "primary" : "default"
                  }
                  startContent={isPlaying ? <Pause /> : <Play />}
                  isLoading={
                    pitch == null ||
                    volume == null ||
                    rate == null ||
                    voice == null ||
                    !voice_exist
                  }
                  onPress={() => {
                    const speech = utterance.current;
                    if (!speech) {
                      setButtonInvalid(true);
                      setTimeout(() => setButtonInvalid(false), 1000);
                    } else if (isStopped) synth?.speak(speech);
                    else if (isPlaying) synth?.pause();
                    else synth?.resume();
                  }}
                  isDisabled={buttonInvalid}
                  isIconOnly
                />
              </Tooltip>
              <Tooltip content="Parar" placement="top">
                <Button
                  size="sm"
                  className="p-1.5"
                  startContent={<Stop />}
                  isDisabled={isStopped}
                  onPress={() => {
                    synth?.cancel();
                    setIsPlaying(false);
                    setIsStopped(true);
                    setProgress(0);
                  }}
                  isIconOnly
                />
              </Tooltip>
              <Progress
                aria-label="progress"
                className="cursor-default"
                color="primary"
                minValue={0}
                maxValue={100}
                value={progress}
                isDisabled={isStopped || !isPlaying}
                isIndeterminate={isPlaying}
              />
            </div>
            <p className="text-small text-default-400">
              Essa funcionalidade está em desenvolvimento e pode apresentar
              falhas
            </p>
          </div>
        ) : (
          <div className="flex flex-row min-w-[90vw] sm:min-w-96 gap-6 px-4 py-2 items-center">
            <div className="flex flex-col w-full gap-2">
              <p className="text-small text-default-400">
                Algo deu errado ao carregar as vozes disponíveis.
              </p>
              <p className="text-small text-default-400">
                Tente o botão ao lado, ou recarregar a página.
              </p>
            </div>
            <Button
              className="p-1.5"
              color="danger"
              startContent={<Reload />}
              onPress={() => setVoices(synth?.getVoices() ?? [])}
              isIconOnly
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
