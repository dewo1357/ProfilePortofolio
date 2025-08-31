import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeProvider";

// LoaderOverlay.jsx
const LoaderOverlay = ({ active = false }) => {
  const [loading, setLoading] = useState(true);
  const { SetAuth } = useTheme();

  useEffect(() => {
    if (!localStorage.Token) {
      SetAuth(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {(loading || active) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-slate-800 opacity-75 dark:opacity-100 dark:bg-transparent p-4 rounded-lg shadow-lg flex items-center justify-center">
            <div className="loader dark:loader2"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoaderOverlay;
