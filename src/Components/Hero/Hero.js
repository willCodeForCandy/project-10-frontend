import './Hero.css';

export const heroData = {
  text: 'Bienvenido a nuestro espacio dedicado a los juegos de mesa: donde la diversión y la estrategia se encuentran. Somos el lugar perfecto para los amantes de los dados, las cartas y los tableros. Nuestros eventos son más que partidas; son experiencias compartidas, risas y momentos inolvidables. Únete a nosotros para sumergirte en un mundo de estrategia, creatividad y camaradería. <br> ¡Ven a jugar y crea recuerdos inolvidables con nosotros!',
  image: '/assets/boardgame03.avif'
};
export const heroSection = ({ title, text, image }) => {
  if (title) {
    return `
    <section id="hero" style="background-image:url(${image})">

    <div>
    <h2>${title}</h2>
      <p>${text}    
      </p>
      <button>Unirme</button>
    </div>
    </section>
    <section id="next-events"></section>
    `;
  } else {
    return `
    <section id="hero" style="background-image:url(${image})">
    <div>
      <p>${text}    
      </p>
      <button>Unirme</button>
    </div>
    </section>
    <section id="next-events"></section>
    `;
  }
};
