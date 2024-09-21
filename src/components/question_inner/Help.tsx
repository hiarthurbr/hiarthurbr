import type { QuestionProps } from "@components/question_inner/Question";
import { HelpPopup } from "@components/svgs";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

export function Help({
  help,
}: {
  help: QuestionProps["help"];
  children?: never;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip
        placement="top-end"
        className="py-2"
        content={
          <p className="max-w-40">
            Mostra uma dica com explicações sobre como resolver a questão.
          </p>
        }
      >
        <Button
          color="primary"
          variant="ghost"
          className="group"
          startContent={
            <HelpPopup className="fill-primary-400 group-hover:fill-primary-100" />
          }
          onPress={onOpen}
          isDisabled={typeof help === "undefined"}
          isIconOnly
        />
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="xl"
      >
        <ModalContent>
          {(_) => (
            <>
              <ModalHeader>Como resolver essa questão?</ModalHeader>
              <ModalBody>
                <p>{help?.text}</p>
              </ModalBody>
              <ModalFooter className="flex flex-row items-end">
                <span className="text-tiny text-default-600">
                  Dica fornecida por{" "}
                  <strong>{help?.author ?? "usuário desconhecido"}</strong>
                  {typeof help?.source !== "undefined" && (
                    <span>
                      {" "}
                      (
                      <Link
                        size="sm"
                        href={help.source.link}
                        showAnchorIcon
                        isExternal
                      >
                        {help.source.name}
                      </Link>
                      )
                    </span>
                  )}
                </span>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
