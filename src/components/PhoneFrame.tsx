interface PhoneFrameProps {
  src: string;
  alt: string;
}

export function PhoneFrame({ src, alt }: PhoneFrameProps) {
  return (
    <figure className="phone-frame">
      <div className="phone-frame__screen">
        <img src={src} alt={alt} />
      </div>
    </figure>
  );
}
