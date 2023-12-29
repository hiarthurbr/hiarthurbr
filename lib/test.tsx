import { useRef } from "react"
import { nullptr } from "@lib/null"

function ComponentWithNullptr() {
	const divRef = useRef<HTMLDivElement>(nullptr())

	return <div ref={divRef} />
}