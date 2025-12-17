import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Layout } from "@/components/layout/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { Customers } from "@/pages/Customers";
import { Pipeline } from "@/pages/Pipeline";
import { Settings } from "@/pages/Settings";
import { CompanyDetail } from "@/pages/CompanyDetail";
import { Tasks } from "@/pages/Tasks";
import { CalendarPage } from "@/pages/CalendarPage";
import { Reports } from "@/pages/Reports";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <LanguageProvider>
          <ThemeProvider>
            <Router>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/gorevler" element={<Tasks />} />
                  <Route path="/takvim" element={<CalendarPage />} />
                  <Route path="/musteriler" element={<Customers />} />
                  <Route path="/firsatlar" element={<Pipeline />} />
                  <Route path="/raporlar" element={<Reports />} />
                  <Route path="/ayarlar" element={<Settings />} />
                  <Route path="/sirket/:companyId" element={<CompanyDetail />} />
                </Route>
              </Routes>
            </Router>
          </ThemeProvider>
        </LanguageProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
