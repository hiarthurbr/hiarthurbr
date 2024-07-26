export default async function copyToClipboard(text: string): Promise<boolean> {
  async function returnQueryOnState(state: PermissionState): Promise<boolean> {
    try {
      const result = await navigator.permissions.query({
        // @ts-expect-error
        name: "clipboard-write",
      });
      return result.state === state;
    } catch {
      return false;
    }
  }

  if (await returnQueryOnState("denied")) {
    console.log("Permission to clipboard denied, trying legacy method...");
    const result = copyFromElement(text);
    if (result) console.log(`Content copied to clipboard: "${text}"`);
    else console.log("Failed to copy, giving up.");
    return result;
  }

  if (typeof navigator.clipboard !== "undefined") {
    try {
      await navigator.clipboard.writeText(text);
      console.log(`Content copied to clipboard: "${text}"`);
      return true;
    } catch (err) {
      console.log("Failed to copy, verifying permission...");
      if (!(await returnQueryOnState("denied"))) return copyFromElement(text);
      return false;
    }
  }

  return false;
}

/**
 * @deprecated
 */
export function copyFromElement(text: string): boolean {
  try {
    console.warn(
      "This method may return true even if the content was not copied.",
    );
    const input = document.createElement("textarea");
    input.setAttribute("readonly", "");
    input.setAttribute("hidden", "");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    // verify if the content was copied
    const result = document.createElement("textarea");
    result.setAttribute("readonly", "");
    result.setAttribute("hidden", "");
    document.body.appendChild(result);
    result.select();
    document.execCommand("paste");
    const copied = result.value;
    document.body.removeChild(result);

    return copied === text;
  } catch {
    return false;
  }
}
