// Full-screen background with a white card in the middle (Figma frame 1440 x 768).
// The card has a photo on the left and the form on the right (photo is hidden on phones).
// Sizes below come from Figma. "login", "signup", "forgot" and "reset" have slightly different measurements.
const LAYOUT = {
  login: {
    card: 'md:w-[770px] md:min-h-[531px] md:pb-[18.67px] md:pl-[22.55px] md:pt-[16.33px]',
    image: 'md:h-[496px] md:w-[328px]',
    form: 'md:ml-[12.65px] md:mt-[2.34px] md:min-h-[494px] md:w-[360.68px] md:p-[18.67px]',
  },
  // Forgot Password (Figma: card 938 x 578, radius 41.69, photo 470 wide touching the card edges, no padding)
  forgot: {
    card: 'md:relative md:min-h-[531px] md:!max-w-[770px] md:overflow-hidden md:!rounded-[41.69px]',
    image: 'md:absolute md:inset-y-0 md:left-0 md:h-full md:w-1/2 md:!rounded-none',
    form: 'md:ml-auto md:w-1/2 md:min-w-0 md:items-center md:justify-start md:px-7 md:pb-10 md:pt-[76px]',
  },
  // Set New Password (Figma: card 856 x 569.12, radius 26.34, photo 385.2 wide, form column 470.8 wide, padding 46.09)
  reset: {
    card: 'md:relative md:min-h-[569.12px] md:w-full md:!max-w-[856px] md:overflow-hidden md:!rounded-[26.34px]',
    image: 'md:absolute md:inset-y-0 md:left-0 md:h-full md:w-[45%] md:!rounded-none',
    form: 'md:ml-auto md:w-[55%] md:min-w-0 md:items-center md:justify-start md:px-[46.09px] md:pb-10 md:pt-[43px]',
  },
  signup: {
    card: 'md:w-[797px] md:min-h-[536px] md:py-[18px] md:pl-[18px]',
    image: 'md:h-[500px] md:w-[350px]',
    form: 'md:ml-[59px] md:min-h-[510px] md:w-[350px] md:py-[13px]',
  },
}

export default function AuthCard({ variant, image, background, children }) {
  const layout = LAYOUT[variant]
  return (
    <main
      className="grid min-h-screen place-items-center bg-cover bg-center px-4 py-8"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div
        className={`flex w-full max-w-[420px] flex-col rounded-[18.67px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:max-w-none md:flex-row md:items-start md:p-0 ${layout.card}`}
      >
        <img
          src={image}
          alt=""
          className={`hidden shrink-0 rounded-[18.67px] object-cover md:block ${layout.image}`}
        />
        <div className={`flex flex-col justify-between gap-6 md:gap-0 ${layout.form}`}>{children}</div>
      </div>
    </main>
  )
}
