import Sidebar from "../../components2/sidebar/Sidebar";
import Topbar from "../../components2/topbar/Topbar"
import "./shome.css"

export default function SHome() {
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
      </div>
    </div>
  );
}
