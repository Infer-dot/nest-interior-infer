const BackgroundSection = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-white">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="smallGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(0,0,0,0.05)"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="grid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Subtle curve lines */}
        <g stroke="rgba(0,0,0,0.1)" strokeWidth="1" fill="none">
          <path d="M0,200 Q250,250 500,200 T1000,200" />
          <path d="M0,800 Q250,750 500,800 T1000,800" />
        </g>

        {/* Two circles */}
        <g stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none">
          <circle cx="150" cy="150" r="100" />
          <circle cx="850" cy="850" r="50" />
        </g>

        {/* Two triangles */}
        <g stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none">
          <polygon points="700,100 750,200 650,200" />
          <polygon points="300,700 400,750 350,850" />
        </g>

        {/* One rectangle */}
        <g stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none">
          <rect
            x="600"
            y="400"
            width="80"
            height="80"
            transform="rotate(15 640 440)"
          />
        </g>
      </svg>
    </div>
  );
};

export default BackgroundSection;
