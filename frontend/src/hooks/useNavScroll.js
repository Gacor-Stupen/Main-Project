import { useNavigate, useLocation } from "react-router-dom";

export default function useNavScroll() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");

    if (location.pathname !== "/") {
      navigate(`/${href}`);
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return handleNavClick;
}