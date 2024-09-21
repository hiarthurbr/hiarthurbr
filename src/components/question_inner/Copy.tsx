import { Clipboard, Exclamation, Copy } from "@components/svgs";
import copyToClipboard from "@lib/copyToClipboard";
import { Button, Tooltip } from "@nextui-org/react";
import { useLayoutEffect, useState } from "react";

export function CopyButton({ text }: { text: string; children?: never }) {
  const [copyState, setCopyState] = useState<null | boolean>(null);
  const [copying, setCopying] = useState(false);

  useLayoutEffect(() => {
    if (copyState !== null) {
      const timeout = setTimeout(() => {
        setCopyState(null);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copyState]);

  return (
    <Tooltip
      placement="top-end"
      className="pb-2"
      content={
        <p className="max-w-40">Copiar questão para a área de transferência</p>
      }
    >
      <Button
        color={copyState == null ? "primary" : copyState ? "success" : "danger"}
        variant={copyState !== null ? "shadow" : "ghost"}
        className="p-1"
        startContent={
          copyState == null ? (
            <Copy />
          ) : copyState ? (
            <Clipboard />
          ) : (
            <Exclamation />
          )
        }
        onPress={() => {
          setCopying(true);
          copyToClipboard(text).then((state) => {
            setCopyState(state);
            setCopying(false);
          });
        }}
        isLoading={copying}
        isIconOnly
      />
    </Tooltip>
  );
}
