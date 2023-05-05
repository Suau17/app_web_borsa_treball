import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { GetUser } from "../services/app/getUser";
import '../assets/perfil.css'
export function DetailsUser() {
    let [profile, setProfile] = useState([])
    const { id } = useParams();
    useEffect(() => {
        GetUser(id).then(profile => setProfile(profile))
    }, [])
    console.log('PROFILEEE')

    let html;
    if (profile.user) {
        const data = profile.alumno[0].curriculum.data
        html = (
            <>
                <div className="card">
                    <div className="img">
                        <img src="public\img\usuario.png" alt="" />
                    </div>
                    <div className="content">
                        <h2>{(profile.user.name).toUpperCase()}</h2>
                        <div className="center">
                            <div className="box">
                                <span  >Email: {profile.user.email}</span><br />
                                <span><a href = {"mailto: "+profile.user.email} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Send Email</a></span>
                                <br />
                                <span ><a href={profile.alumno[0].link} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Pagina personal</a> </span>
                            </div>

                        </div>
                        <a target="_blank" href={`${import.meta.env.VITE_URL}/app/curriculum/${profile.alumno[0]._id}`} download><button className="btn">CV</button></a> 
                    </div>






                </div>
            </>
        )
    } else {
        html = (
            <>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }
    return html
}
