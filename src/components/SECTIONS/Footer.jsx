const Footer = ({ scrollonTop }) => {
  return (
    <footer>
      <p>&copy; 2026 TechStore </p>
      <button onClick={scrollonTop} style={{
        position: "footer",
        bottom: "30px",
        right: "30px"
      }}>TOP^</button>
    </footer>
  );
};
export default Footer;
