import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/dashboard-layout";
import { AllLinksPage } from "./pages/all-links";
import { CreateLinkPage } from "./pages/create-link";
import { OverviewStatsPage } from "./components/overview/overview-stats-state";
import PDFViewer from "./pages/SecurePdfSigner";
// import PayrollWizard from "./components/client/payroll-wizard";
import ScrollablePdfViewer from "./pages/custom-pdf";
import PdfUploadViewer from "./pages/pdf";
import SimplePdfViewer from "./pages/simple-pdf";
import SamplePdfPage from "./pages/sample";
import SignDocumentWizard from "./components/wizard/wizard-layout";
import LandingPage from "./pages/home";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import { ProtectedRoute } from "./ProtectedLayout";
import SimplePdfViewer1 from "./components/home/newpdfviewer";
import Test from "./pages/test2";
import SOWEditor from "./pages/Test3";
import PdfSigner from "./components/editor/responsive";
import QuataraEditor from "./components/QuataraEditor";

// Simple page components for testing
// const Overview = () => <div className="text-2xl font-bold">Overview Page</div>;
// const AllLinks = () => <div className="text-2xl font-bold">All Links Page</div>;
const Signatures = () => <p>signature</p>;
const Invoices = () => <div className="text-2xl font-bold">Invoices Page</div>;
const Settings = () => <div className="text-2xl font-bold">Settings Page</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/overview" element={<OverviewStatsPage />} />
          <Route path="/all-links" element={<AllLinksPage />} />
          <Route path="/signatures" element={<Signatures />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create-link" element={<CreateLinkPage />} />
        </Route>



        
        <Route path="/client" element={<SignDocumentWizard />} />
        <Route path="/w" element={<PdfSigner initialFile="/sp.pdf" onClose={()=> alert("ok")} />} />
        <Route path="/q" element={<PdfUploadViewer />} />
        {/* <Route path="/u" element={<SimplePDFViewer1 />} /> */}
        <Route path="/e" element={<SamplePdfPage />} />
        <Route path="/r" element={<SimplePdfViewer fileUrl="/sp.pdf" />} />
        <Route path="/t" element={<ScrollablePdfViewer file="/sp.pdf" />} />
        <Route path="/y" element={<SimplePdfViewer1 fileUrl="/sp.pdf" />} />
        <Route path="/editor" element={<QuataraEditor />} />
        <Route
          path="/o"
          element={<PDFViewer fileUrl="/sp.pdf" x={200} y={200} page={1} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
