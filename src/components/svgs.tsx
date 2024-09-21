type SvgProps = JSX.IntrinsicElements["svg"];

export const PaperClip = (props: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.7}
      {...props}
    >
      <title>Paper clip symbol</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  );
};

export const Clipboard = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <title>ClipBoard symbol</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
    />
  </svg>
);

export const Exclamation = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <title>Exclamation symbol</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
);

export const Info = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <title>Informations</title>
    <path d="M443-271h79v-249h-79v249Zm36.982-306q20.518 0 33.768-12.9Q527-602.799 527-622.825q0-23.125-13.182-35.65Q500.636-671 480.193-671q-22.693 0-34.943 12.35Q433-646.301 433-624.175q0 21.275 13.232 34.225Q459.465-577 479.982-577Zm-.037 518q-87.053 0-164.146-32.604-77.094-32.603-134.343-89.852-57.249-57.249-89.852-134.41Q59-393.028 59-480.362q0-87.228 32.662-163.934 32.663-76.706 90.203-134.253 57.54-57.547 134.252-90.499Q392.829-902 479.836-902q87.369 0 164.544 32.858 77.175 32.858 134.401 90.257 57.225 57.399 90.222 134.514Q902-567.257 902-479.724q0 87.468-32.952 163.882t-90.499 133.781q-57.547 57.367-134.421 90.214Q567.255-59 479.945-59Zm.326-91q136.242 0 232.985-96.387Q810-342.773 810-480.271q0-136.242-96.327-232.985Q617.346-810 479.729-810q-136.242 0-232.985 96.327Q150-617.346 150-479.729q0 136.242 96.387 232.985Q342.773-150 480.271-150ZM480-480Z" />
  </svg>
);

export const Anchor = (props: SvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <title>Anchor symbol</title>
    <path
      d="M8.465,11.293c1.133-1.133,3.109-1.133,4.242,0L13.414,12l1.414-1.414l-0.707-0.707c-0.943-0.944-2.199-1.465-3.535-1.465 S7.994,8.935,7.051,9.879L4.929,12c-1.948,1.949-1.948,5.122,0,7.071c0.975,0.975,2.255,1.462,3.535,1.462 c1.281,0,2.562-0.487,3.536-1.462l0.707-0.707l-1.414-1.414l-0.707,0.707c-1.17,1.167-3.073,1.169-4.243,0 c-1.169-1.17-1.169-3.073,0-4.243L8.465,11.293z"
      fill="currentColor"
    />
    <path
      d="M12,4.929l-0.707,0.707l1.414,1.414l0.707-0.707c1.169-1.167,3.072-1.169,4.243,0c1.169,1.17,1.169,3.073,0,4.243 l-2.122,2.121c-1.133,1.133-3.109,1.133-4.242,0L10.586,12l-1.414,1.414l0.707,0.707c0.943,0.944,2.199,1.465,3.535,1.465 s2.592-0.521,3.535-1.465L19.071,12c1.948-1.949,1.948-5.122,0-7.071C17.121,2.979,13.948,2.98,12,4.929z"
      fill="currentColor"
    />
  </svg>
);

export const DuckEmoji = (props: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" {...props}>
    <title>Duck emoji</title>
    <path
      fill="#D99E82"
      d="M12.75 17.75c1.226 2.195 1.856-1.361 9.312-2.625s13.729 4.454 13.859 5.413c.132.958-4.447 9.462-9.462 9.462H10.75c-4.143 0-7.022-7.224-4-11.438 0 0 4.5-3.5 6-.812z"
    />
    <path
      fill="#C1694F"
      d="M13.008 18.136C8.02 25.073 6.969 30 10.75 30c-4.143 0-6.578-6.188-4.468-11.031.463-1.064 1.758-2.492 1.758-2.492l4.179-.008c.162.32.599 1.365.789 1.667z"
    />
    <path
      fill="#E1E8ED"
      d="M20.062 22.75c6.672-2.682 15.729-3.171 15.859-2.212.132.958-4.447 9.462-9.462 9.462H11.813c-4.143 0 1.232-4.429 8.249-7.25z"
    />
    <path
      fill="#292F33"
      d="M25.359 21.125c6-1.312 10.468-1.282 10.563-.587.079.578-1.559 3.907-3.973 6.454 2.204-2.804 1.42-6.113-6.59-5.867z"
    />
    <path
      fill="#3E721D"
      d="M7.125 6.125c1.562-4.938 10.44-4.143 10.062.688-.378 4.829-6.453 7.859-4.179 11.323-1.586 1.38-5.016.913-6.727.833.702-1.351 1.381-2.631 1.812-3.406 2.916-5.235-2.131-5.764-.968-9.438z"
    />
    <path
      fill="#FFCC4D"
      d="M1.893 9.045c.568-1.1.549.106 3.352.142 1.554.021 1.463-.56 1.664-1.621.041-.223.776 1.616 2.061 1.807 3.554.531 1.879 1.94 0 2.261-.901.154-2.01.318-3.938.155-2.519-.212-3.768-1.528-3.139-2.744z"
    />
    <path
      fill="#F5F8FA"
      d="M12.502 16.625c.044.625.506 1.511.506 1.511-1.016 1.474-5.643 3.017-7.354 2.93.096-.628.283-1.362.627-2.097 1.844-.471 4.661-1.071 6.221-2.344z"
    />
    <path
      fill="#292F33"
      d="M11.708 6.151c0 .716-.58 1.296-1.296 1.296s-1.295-.58-1.295-1.296c0-.716.579-1.295 1.295-1.295s1.296.58 1.296 1.295z"
    />
  </svg>
);

export const Gaming = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <title>Gaming symbol</title>
    <path d="M480-654Zm174 174Zm-347 0Zm173 173Zm0-235L352-670v-239h257v239L480-542Zm190 190L542-480l128-129h239v257H670Zm-619 0v-257h239l129 129-129 128H51ZM352-51v-239l128-129 129 129v239H352Zm128-603 48-46.192V-829h-94v128l46 47ZM132-434h128l47-46-45.918-48H132v94Zm302 302h94v-128l-48-47-46 45.918V-132Zm266.192-302H829v-94H701l-47 48 46.192 46Z" />
  </svg>
);

export const ArrowDown = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    role="presentation"
    {...props}
  >
    <path d="M480-322 212-589h536L480-322Z" />
  </svg>
);

export const Triangle = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    role="presentation"
    {...props}
  >
    <path d="m-1-111 481-770 481 770H-1Z" />
  </svg>
);

export const Square = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    role="presentation"
    {...props}
  >
    <path d="M74-74v-812h812v812H74Z" />
  </svg>
);

export const Circle = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    role="presentation"
    {...props}
  >
    <path d="M480-34q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z" />
  </svg>
);

export const Diamond = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    role="presentation"
    {...props}
  >
    <path d="M480-137 137-480l343-343 343 343-343 343Z" />
  </svg>
);

export const HelpPopup = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    role="presentation"
    {...props}
  >
    <path d="M589-394q19 0 32.5-13t13.5-32q0-19-13.5-32T589-484q-18 0-31.5 13T544-439q0 19 13.5 32t31.5 13Zm-33-115h67q-1-19 6.65-34.55Q637.29-559.1 652-575q30-31 41-50.5t11-43.27q0-48.19-31.76-76.71Q640.47-774 585.89-774q-42.71 0-74.8 23.5Q479-727 468-686l59 24q8-24 23.2-37 15.19-13 35.71-13Q610-712 624-700q14 12 14 33 0 14.48-8 27.41T603-608q-30 27-38.5 45.5T556-509ZM358-217q-55.73 0-95.86-40.14Q222-297.27 222-353v-460q0-55.72 40.14-95.86Q302.27-949 358-949h460q55.72 0 95.36 40.14T953-813v460q0 55.73-39.64 95.86Q873.72-217 818-217H358ZM142-2Q86.28-2 46.64-41.64T7-137v-596h135v596h596V-2H142Z" />
  </svg>
);

export const Moon = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    role="presentation"
    {...props}
  >
    <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
  </svg>
);

export const Sun = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    role="presentation"
    {...props}
  >
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
  </svg>
);

export const Close = (props: SvgProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    {...props}
  >
    <path
      d="M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Cog = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    role="presentation"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

export const Copy = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    role="presentation"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
    />
  </svg>
);

export const Speaker = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    role="presentation"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
    />
  </svg>
);

export const SpeakerMute = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    role="presentation"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
    />
  </svg>
);

export const Play = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    role="presentation"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
    />
  </svg>
);

export const Pause = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    role="presentation"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 5.25v13.5m-7.5-13.5v13.5"
    />
  </svg>
);

export const LowPitch = (props: SvgProps) => (
  <svg
    viewBox="0 0 36 36"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    {...props}
  >
    <g fill="#f18f26">
      <path d="m0 18h36v9h-36z" />
      <ellipse cx="18" cy="26" rx="18" ry="9" />
      <ellipse cx="18" cy="27" rx="18" ry="9" />
    </g>
    <path
      d="m0 10v16h.117c.996 4.499 8.619 8 17.883 8s16.887-3.501 17.883-8h.117v-16z"
      fill="#9d0522"
    />
    <ellipse cx="18" cy="11" fill="#f18f26" rx="18" ry="9" />
    <ellipse cx="18" cy="12" fill="#f18f26" rx="18" ry="9" />
    <path d="m0 10h1v2h-1zm35 0h1v2h-1z" fill="#f18f26" />
    <ellipse cx="18" cy="10" fill="#fcab40" rx="18" ry="9" />
    <ellipse cx="18" cy="10" fill="#f5f8fa" rx="17" ry="8" />
    <path
      d="m18 3c9.03 0 16.395 3.316 16.946 7.5.022-.166.054-.331.054-.5 0-4.418-7.611-8-17-8s-17 3.582-17 8c0 .169.032.334.054.5.551-4.184 7.916-7.5 16.946-7.5z"
      fill="#fdd888"
    />
    <path
      d="m28.601 2.599c.44-.33.53-.96.2-1.4l-.6-.8c-.33-.44-.96-.53-1.4-.2l-12.644 10.044c-.774-.167-1.785.083-2.673.749-1.326.994-1.863 2.516-1.2 3.4s2.275.794 3.6-.2c.835-.626 1.355-1.461 1.462-2.215zm5.868 2.919-.509-.861c-.28-.474-.896-.632-1.37-.352l-13.913 8.751c-.719-.141-1.626.023-2.472.524-1.426.843-2.127 2.297-1.565 3.248s2.174 1.039 3.6.196c1.005-.594 1.638-1.49 1.735-2.301l14.142-7.835c.474-.281.632-.897.352-1.37z"
      fill="#aa695b"
    />
    <path
      d="m2 28c-.55 0-1-.45-1-1v-9c0-.55.45-1 1-1s1 .45 1 1v9c0 .55-.45 1-1 1zm9 4c-.55 0-1-.45-1-1v-9c0-.55.45-1 1-1s1 .45 1 1v9c0 .55-.45 1-1 1zm12 0c-.55 0-1-.45-1-1v-9c0-.55.45-1 1-1s1 .45 1 1v9c0 .55-.45 1-1 1zm11-4c-.55 0-1-.45-1-1v-9c0-.55.45-1 1-1s1 .45 1 1v9c0 .55-.45 1-1 1z"
      fill="#da2f47"
    />
  </svg>
);

export const HighPitch = (props: SvgProps) => (
  <svg
    viewBox="0 0 36 36"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    {...props}
  >
    <path
      d="m23.912 12.087c-1.693-1.693-3.594-2.587-5.497-2.587-1.626 0-3.189.667-4.402 1.88-1.519 1.519-1.727 2.39-1.865 2.966-.071.295-.106.421-.255.57-.106.106-.155.256-.14.406.015.149.1.286.225.369.013.009.324.22.368.651.039.394-.13 1.08-1.16 2.11-.629.629-1.252.948-1.85.948-.981 0-1.649-.87-1.654-.877-.11-.15-.295-.226-.48-.197s-.337.159-.396.335c-.221.663-.251.668-.535.709-.59.086-1.578.229-3.624 2.275-1.675 1.675-2.266 3.767-1.708 6.048.395 1.617 1.408 3.358 2.708 4.659 1.408 1.408 3.802 2.912 6.301 2.912 1.654 0 3.137-.643 4.406-1.912 2.045-2.046 2.189-3.033 2.274-3.624.042-.284.046-.313.71-.534.177-.06.307-.212.336-.396s-.046-.369-.196-.48c-.008-.006-.805-.619-.873-1.527-.047-.638.27-1.302.944-1.976.963-.963 1.622-1.165 2.005-1.165.504 0 .746.357.752.366.08.13.216.216.368.234.142.016.303-.035.411-.144.149-.149.275-.185.57-.255.576-.139 1.446-.348 2.965-1.866 2.286-2.286 2.955-6.234-.708-9.898z"
      fill="#f18f26"
    />
    <path d="m34 3-15 17-3-3 17-15z" fill="#292f33" />
    <path
      d="m13 27c-.256 0-.512-.098-.707-.293l-3-3c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l3 3c.391.391.391 1.023 0 1.414-.196.195-.452.293-.707.293z"
      fill="#642116"
    />
    <path
      d="m4.628 29.935 24.172-24.128.53.531-24.17 24.128zm.869.869 24.173-24.128.531.532-24.173 24.127z"
      fill="#ccd6dd"
    />
    <path
      d="m34.704 2.685c.438.438.438 1.155-.001 1.592l-3.186 3.186c-.438.438-1.155.438-1.593-.001l-1.39-1.389c-.438-.438-.438-1.155.001-1.592l3.187-3.186c.438-.438 1.155-.438 1.593 0z"
      fill="#f18f26"
    />
    <path d="m2 32 4-5s1 0 2 1 1 2 1 2l-5 4z" fill="#292f33" />
    <g fill="#642116">
      <circle cx="33" cy="8" r="1" />
      <circle cx="35" cy="6" r="1" />
      <circle cx="28" cy="3" r="1" />
      <circle cx="30" cy="1" r="1" />
    </g>
  </svg>
);

export const LowVelocity = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
    role="presentation"
    {...props}
  >
    <path
      fill="#77B255"
      d="M9.842 19.922c0 9.842 6.575 9.673 5.158 10.078-7 2-8.803-7.618-9.464-7.618-2.378 0-5.536-.423-5.536-2.46C0 17.883 2.46 15 6.151 15c2.379 0 3.691 2.883 3.691 4.922zM36 28.638c0 1.104-3.518-.741-5 0-2 1-2-.896-2-2s1.343-1 3-1 4 1.895 4 3z"
    />
    <path
      fill="#77B255"
      d="M16.715 33.143c0 2.761-1.279 2.857-2.857 2.857S11 35.903 11 33.143c0-.489.085-1.029.234-1.587.69-2.59 2.754-5.556 4.052-5.556 1.578 0 1.429 4.382 1.429 7.143zm8.571 0c0 2.761 1.278 2.857 2.856 2.857C29.721 36 31 35.903 31 33.143c0-.489-.085-1.029-.234-1.587-.691-2.59-2.754-5.556-4.052-5.556-1.578 0-1.428 4.382-1.428 7.143z"
    />
    <path
      fill="#3E721D"
      d="M32 27c0 4-5.149 4-11.5 4S9 31 9 27c0-6.627 5.149-12 11.5-12S32 20.373 32 27z"
    />
    <circle fill="#292F33" cx="5" cy="18" r="1" />
    <path
      fill="#5C913B"
      d="M23.667 25.1c0 3.591-1.418 3.9-3.167 3.9s-3.167-.31-3.167-3.9S18.75 17 20.5 17s3.167 4.51 3.167 8.1zM30 24c.871 3.482-.784 4-2.533 4-1.749 0-2.533.69-2.533-2.9s-1.116-6.5.633-6.5C27.315 18.6 29 20 30 24zm-13.933 1.1c0 3.591-.785 2.9-2.534 2.9s-3.404-.518-2.533-4c1-4 3.251-5.4 5-5.4 1.75 0 .067 2.91.067 6.5z"
    />
  </svg>
);

export const HighVelocity = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
    role="presentation"
    {...props}
  >
    <path
      fill="#99AAB5"
      d="M9 11C9 6.858 7 0 8 0s7 4 5 11c-1.138 3.983-.896 4-2 4s-2 .142-2-4z"
    />
    <path
      fill="#F4ABBA"
      d="M9.55 11.704c0-3.414-1.297-9.065-.648-9.065.648 0 4.538 3.296 3.241 9.065-.738 3.282-.581 3.296-1.297 3.296s-1.296.117-1.296-3.296z"
    />
    <path
      fill="#99AAB5"
      d="M4.789 12.375C3.726 8.372.033 2.256 1 2c.966-.257 7.792 2.07 7.655 9.349-.078 4.142.161 4.096-.907 4.379-1.068.283-1.897.65-2.959-3.353z"
    />
    <path
      fill="#F4ABBA"
      d="M5.5 12.914c-.875-3.299-3.579-8.429-2.952-8.595.627-.167 5.232 2.022 5.458 7.93.129 3.361.285 3.335-.407 3.519-.692.183-1.223.445-2.099-2.854z"
    />
    <circle fill="#CCD6DD" cx="32.5" cy="28.5" r="3.5" />
    <path
      fill="#99AAB5"
      d="M30.733 31.736C32.227 30.354 33 28.218 33 25c0-7.18-6.82-11-14-11-2.057 0-3.829.157-5.323.54C12.592 13.41 10.817 13 8.4 13 4.136 13 0 17.069 0 21.333c0 4.13 3.88 4.637 7.999 4.664L8 26c3 5 1 10 3 10 1.588 0 1.914-2.217 1.981-4.375 1.068.663 2.258 1.191 3.531 1.577C15.635 33.726 15 34.271 15 34.5c0 1.381 2 1.5 5 1.5 5.522 0 13 0 11-4-.054-.107-.151-.19-.267-.264z"
    />
    <circle fill="#292F33" cx="6" cy="18" r="1" />
    <path
      fill="#F4ABBA"
      d="M2 21c0 1.104-.5 2-1 2s-1-.896-1-2 .448-1 1-1 1-.104 1 1z"
    />
  </svg>
);

export const Stop = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    role="presentation"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
    />
  </svg>
);

export const Menu = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    role="presentation"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
    />
  </svg>
);

export const Reload = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    role="presentation"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
);

export const SingleCheck = (props: SvgProps) => (
  <svg
    viewBox="0 0 12 11"
    height="11"
    width="16"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    {...props}
  >
    <path
      d="M11.1549 0.652832C11.0745 0.585124 10.9729 0.55127 10.8502 0.55127C10.7021 0.55127 10.5751 0.610514 10.4693 0.729004L4.28038 8.36523L1.87461 6.09277C1.8323 6.04622 1.78151 6.01025 1.72227 5.98486C1.66303 5.95947 1.60166 5.94678 1.53819 5.94678C1.407 5.94678 1.29275 5.99544 1.19541 6.09277L0.884379 6.40381C0.79128 6.49268 0.744731 6.60482 0.744731 6.74023C0.744731 6.87565 0.79128 6.98991 0.884379 7.08301L3.88047 10.0791C4.02859 10.2145 4.19574 10.2822 4.38194 10.2822C4.48773 10.2822 4.58929 10.259 4.68663 10.2124C4.78396 10.1659 4.86436 10.1003 4.92784 10.0156L11.5738 1.59863C11.6458 1.5013 11.6817 1.40186 11.6817 1.30029C11.6817 1.14372 11.6183 1.01888 11.4913 0.925781L11.1549 0.652832Z"
      fill="currentcolor"
    />
  </svg>
);

export const DoubleCheck = (props: SvgProps) => (
  <svg
    viewBox="0 0 16 11"
    height="11"
    width="16"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    {...props}
  >
    <path
      d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z"
      fill="currentColor"
    />
  </svg>
);

export const Ban = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    role="presentation"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m4.9 4.9 14.2 14.2" />
  </svg>
);

export const Edit = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    role="presentation"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);
