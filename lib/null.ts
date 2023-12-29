/**
 * Usefull when prototyping or to fill an uninitialised variable,
 * without typescript complaining about type mismatch
 * @returns a null value that fills the given generic
 * @example ```jsx
 *  import { useRef } from "react"
 *
 *	function Component() {
 *		const divRef = useRef<HTMLDivElement>()
 *		// ERROR: Type 'MutableRefObject<HTMLDivElement | undefined>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'
 *		return <div ref={divRef} />
 *	}

 *	import { nullptr } from "@lib/null"

 *	function ComponentWithNullptr() {
 *		const divRef = useRef<HTMLDivElement>(nullptr())
 *		// No error thrown!, still works as intented because divRef is not assigned at runtime or reassigned in some process
 *		return <div ref={divRef} />
 *	}
 * ```
 */
export function nullptr<P>(): P {
  return null as unknown as P;
}