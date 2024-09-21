import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";

export function TitleBadge({
  content,
  colors,
  label,
}: {
  children?: never;
  content: JSX.Element;
  label: string;
  colors: readonly [string, string, string, string, string];
}) {
  const trigger = (
    <span className="font-extrabold">
      [
      <span
        className="bg-clip-text text-transparent animate-gradient hover:animate-none font-black saturate-[85%]"
        style={{
          backgroundImage: `linear-gradient(-45deg, ${[
            ...colors,
            ...colors,
          ].join(", ")})`,
          backgroundSize: "300% 300%",
          backgroundPosition: "0% 50%",
        }}
      >
        {label}
      </span>
      ]
    </span>
  );

  return (
    <span>
      <Tooltip content={content} placement="bottom-start" showArrow>
        <span className="[@media(hover:none)]:hidden">{trigger}</span>
      </Tooltip>
      <Popover placement="bottom-start" showArrow>
        <PopoverTrigger>
          <Button
            variant="light"
            size="lg"
            radius="none"
            className="p-0 m-0 border-0 h-min [@media(hover:none)]:inline-block hidden data-[hover=true]:bg-transparent"
          >
            {trigger}
          </Button>
        </PopoverTrigger>
        <PopoverContent>{content}</PopoverContent>
      </Popover>
    </span>
  );
}
