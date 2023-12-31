import "./Home.css";
import Login from "./Login";
import Signup from "./Signup";

export default function Home() {
  return (
    <div id="about" style={{marginTop:"1.3em"}}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              style={{ marginRight: "1em", backgroundColor: "#F21401",color:"white" }}
            >
              LOGIN
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
              style={{ marginLeft: "1em",backgroundColor: "#F21401",color:"white" }}
            >
              REGISTER
            </button>
          </li>
        </ul>
      </div>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <Login />
        </div>
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <Signup />
        </div>
      </div>
    </div>
  );
}
