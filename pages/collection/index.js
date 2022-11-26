import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";

function Index() {
    return (
        <div>
            <button
                className="btn "
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
            >
                <MenuIcon fontSize="large" />
            </button>

            <div
                className="offcanvas offcanvas-start"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabIndex="1"
                id="offcanvasScrolling"
                aria-labelledby="offcanvasScrollingLabel"
            >
                <div className="offcanvas-header">
                    <h5
                        className="offcanvas-title"
                        id="offcanvasScrollingLabel"
                    >
                        Collections
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body offcanva">
                    <Link
                        href="/collection/cohortstorefeedback"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="navItem">CohortStoreFeedback</div>
                    </Link>
                    <hr />

                    <Link
                        href="/collection/cohortactivity"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="navItem">CohortActivity</div>
                    </Link>
                    <hr />
                    <Link
                        href="/collection/emoji"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="navItem">emoji</div>
                    </Link>
                    <hr />
                    <Link
                        href="/collection/feedcommentcollection"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="navItem">feedCommentCollection</div>
                    </Link>
                    <hr />
                    <Link
                        href="/collection/feeddatacollection"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="navItem">feedDataCollection</div>
                    </Link>
                    <hr />

                    <Link
                        href="/collection/negative"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="navItem">negative</div>
                    </Link>
                    <hr />

                    <Link
                        href="/collection/negativebreathe"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="navItem">Neagtive Breathe</div>
                    </Link>
                    <hr />

                    <Link
                        href="/collection/negativelemon"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="navItem">Negative lemon</div>
                    </Link>
                    <hr />
                    <Link
                        href="/collection/phonelogindetails"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="navItem">phoneLoginDetails</div>
                    </Link>
                    <hr />
                    <Link
                        href="/collection/storefeedback"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="navItem">storeFeedback</div>
                    </Link>
                    <hr />
                    <Link
                        href="/collection/letter"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="navItem">letter</div>
                    </Link>
                    <hr />
                    <Link
                        href="/collection/ytlink"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="navItem">ytLink</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Index;
