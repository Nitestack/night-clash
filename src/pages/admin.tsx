import { NextPageWithConfiguration } from "@util/types";
import { useEffect, useState } from "react";
import Util from "@util/index";

const AdminPage: NextPageWithConfiguration = () => {
    const [userCount, setUserCount] = useState(0);
    useEffect(() => {
        updateUserCount();
    }, []);
    function updateUserCount() {
        Util.jqueryAjax("/api/admin/getusercount", {
            method: "POST",
            success: function(res) {
                setUserCount(res.userCount);
            }
        });
    };
    function displayAllUsers() {
        Util.jqueryAjax("/api/admin/getallusers", {
            method: "POST",
            success: function(res) {
                $("#userDisplay").html(res.usersHTMLCode);
            }
        });
    };
    function displayAllCoCVillages() {
        Util.jqueryAjax("/api/admin/getallcocvillages", {
            method: "POST",
            success: function(res) {
                $("#cocVillageDisplay").html(res.cocVillagesHTMLCode);
            }
        });
    };
    return (<>
        <div className="container">
            <div className={style.row}>
                <h3 className="coc" align="center"> Stats </h3>
                <div align="center">
                    <p>
                        <span className="cr-description">{userCount}</span>
                    </p>
                    <button className="btn btn-success" onClick={() => updateUserCount()}> Update </button>
                </div>
            </div>
            <div className={style.row}>
                <h3 className="coc" align="center"> User Board </h3>
                <div align="center">
                    <button className="btn btn-success" onClick={() => displayAllUsers()}> Display all users </button>
                    <div className="ui styled accordion">
                        <div className="title">Create user</div>
                        <div className="content">
                            <div className="ui input">
                                <input type="text" placeholder="Username"></input>
                            </div>
                        </div>
                    </div>
                    <pre className={style.pre}>
                        <code id="userDisplay" className="language-json"></code>
                    </pre>
                </div>
            </div>
            <div className={style.row}>
                <h3 className="coc" align="center"> Clash of Clans Villages Board </h3>
                <div align="center">
                    <button className="btn btn-success" onClick={() => displayAllCoCVillages()}> Display all Clash of Clans villages </button>
                    <pre className={style.pre}>
                        <code id="cocVillageDisplay" className="language-json"></code>
                    </pre>
                </div>
            </div>
        </div>
    </>);
};
AdminPage.title = "Admin Access";
AdminPage.description = "Get stats, manage and get data!";

export default AdminPage;