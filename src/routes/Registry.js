import React, {useState, useEffect} from 'react';

export default function Registry() {
  const registryUrl = 'https://www.target.com/gift-registry/giftgiver?registryId=12468e2170ef4dcd8317a1698220f3a1';
  const [time, setTime] = useState(0);
  const link = React.useRef(null);
  const SECONDS_AT_REDIRECT = 8;

  useEffect(() => {
    const timer = setInterval(() => setTime(x => x+1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if(SECONDS_AT_REDIRECT-time < 0) {
      link.current?.click();
    }
  }, [time]);

  return (
    <main className="registry">
      <p>We have registered at Target!</p>
      <p>You will be automatically redirected to our registry in {Math.max(1, SECONDS_AT_REDIRECT - time)} second{Math.max(1, SECONDS_AT_REDIRECT - time) === 1 ? '' : 's'}.</p>
      <p>If you do not want to be redirected, move to any other tab.</p>
      <br /><br />
      <a href={registryUrl} ref={link}>{registryUrl}</a>
    </main>
  )
}
