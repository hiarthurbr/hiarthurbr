"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Slider } from "@nextui-org/slider";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Cog } from "./svgs";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  DOT_SIZE_KEY,
  GRID_ENABLED_KEY,
  REFRESH_RATE_KEY,
  STEP_BY_KEY,
} from "@lib/const";

export function Config() {
  const [stepBy, setStepBy] = useState<number | null>(null);
  const [dotSize, setDotSize] = useState<number | null>(null);
  const [gridEnabled, setGridEnabled] = useState<boolean | null>(null);
  const [refreshRate, setRefreshRate] = useState<string | null>(null);

  useEffect(() => {
    // @ts-ignore
    const isMobile = navigator.userAgentData?.mobile;
    const isMobileReader =
      !/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    setStepBy(Number(localStorage.getItem(STEP_BY_KEY) ?? 25));
    setDotSize(Number(localStorage.getItem(DOT_SIZE_KEY) ?? 0.75));
    setGridEnabled(
      localStorage.getItem(GRID_ENABLED_KEY) !==
        `${!(isMobile ?? isMobileReader)}`,
    );
    setRefreshRate(localStorage.getItem(REFRESH_RATE_KEY) ?? "normal");
  }, []);

  useLayoutEffect(() => {
    if (stepBy === null) return;
    localStorage.setItem(STEP_BY_KEY, `${stepBy}`);
  }, [stepBy]);

  useLayoutEffect(() => {
    if (gridEnabled === null) return;
    localStorage.setItem(GRID_ENABLED_KEY, `${gridEnabled}`);
  }, [gridEnabled]);

  useLayoutEffect(() => {
    if (dotSize === null) return;
    localStorage.setItem(DOT_SIZE_KEY, `${dotSize}`);
  }, [dotSize]);

  useLayoutEffect(() => {
    if (refreshRate === null) return;
    localStorage.setItem(REFRESH_RATE_KEY, refreshRate ?? "normal");
  }, [refreshRate]);

  return (
    <Popover placement="bottom-end" showArrow>
      <PopoverTrigger>
        <Button className="p-1.5" startContent={<Cog />} isIconOnly />
      </PopoverTrigger>
      <PopoverContent className="pt-2 pb-4">
        <h2>Configurações</h2>
        <div className="flex flex-col min-w-80">
          <h3>Fundo do website</h3>
          <div className="flex flex-col ml-4 pr-1 gap-2 mt-2">
            <Switch
              isSelected={gridEnabled ?? true}
              onValueChange={setGridEnabled}
              defaultSelected
            >
              Exibir Grade
            </Switch>
            <Slider
              label="Separação dos pontos"
              getValue={(value) => `${value}px`}
              color="foreground"
              marks={[
                { value: 10, label: "10px" },
                { value: 25, label: "25px" },
                { value: 50, label: "50px" },
              ]}
              value={stepBy ?? 25}
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              onChange={setStepBy as any}
              minValue={10}
              step={5}
              defaultValue={25}
              maxValue={50}
              isDisabled={!gridEnabled}
              showOutline
              showTooltip
              showSteps
            />
            <Slider
              label="Tamanho do ponto"
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              onChange={setDotSize as any}
              color="foreground"
              step={0.01}
              maxValue={1.5}
              minValue={0.5}
              fillOffset={0.75}
              isDisabled={!gridEnabled}
              value={dotSize ?? 0.75}
            />
            <div>
              <h3>Taxa de atualização</h3>
              <Tabs
                color="primary"
                className="mt-1"
                aria-label="Taxa de atualização"
                selectedKey={refreshRate}
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                onSelectionChange={setRefreshRate as any}
                isDisabled={!gridEnabled}
              >
                <Tab key="low" title="Baixa" />
                <Tab key="normal" title="Normal" />
                <Tab key="high" title="Alta" />
                <Tab key="realtime" title="Tempo-real" />
              </Tabs>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
