import  { useState } from 'react';
import './Login.css'; // Place your styles or use Tailwind classes
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuthToken } from '../../services/useAuthToken';

const Login = () => {
    const [form, setForm] = useState({ userId: '', password: '', captcha: '' });
    let simpleCaptcha: any = "simpleCaptcha.jpg";
    simpleCaptcha = 'https://coe.cuetrans.com/CueTrans/' + simpleCaptcha;
    const navigate = useNavigate();
    const { setToken } = useAuthToken();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleLogin = async () => {
         Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
        });

        const payload = {
            methodName: 'fetchTenantId',
            strUserId: form.userId,
            strPassword: form.password,
            answer: form.captcha,
        };

        const requestData = new URLSearchParams();
        requestData.append('workFlowName', 'CoreTenantService');
        requestData.append('processType', 'Screen');
        requestData.append('workFlowParams', JSON.stringify(payload));

        fetch('/JMSServlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: requestData,
        })
            .then(async (res) => {
                const text = await res.text();

                try {
                    const in_json_data = JSON.parse(text);
                    if (in_json_data["strFailureMsg"] != "" && in_json_data["strFailureMsg"] != undefined) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: in_json_data["strFailureMsg"],
                            confirmButtonText: 'OK'
                        })
                        return;
                    }
                    if (in_json_data["strResponseMsg"] != "" && in_json_data["strResponseMsg"] != undefined) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: in_json_data["strResponseMsg"],
                            confirmButtonText: 'OK'
                        })
                        return;
                    }
                    const homeStoreValue = in_json_data["consoleTransaction_array"]
                    
                    in_json_data.hdrcache.forEach((hdrcache_obj: { [x: string]: any; }) => {
                    for (const key in hdrcache_obj) {
                    const value = hdrcache_obj[key];
                    switch (key) {
                        case 'USER_NAME':
                        // Example: Update user name UI or state
                        console.log('User Name:', value);
                        // setUserName(value); // if using useState
                        break;

                        case 'ROLE_NAME':
                        console.log('Role Name:', value);
                        // setRoleName(value);
                        break;

                        case 'ENTITY_NAME':
                        console.log('Entity Name:', value);
                        // setEntityName(value);
                        break;

                        case 'hdnAuthToken':
                        console.log('AuthToken:', value);
                        // Store globally using singleton
                        setToken(value); // Store in sessionStorage and react state
                        break;

                        case 'FIRST_LOGIN':
                        console.log('First Login:', value);
                        // setFirstLogin(value === 'Y');
                        break;

                        case 'DEFAULT_SCREEN':
                        console.log('Default Screen:', value);
                        // Optional: redirect or navigate
                        break;

                        default:
                        console.log(`${key}:`, value);
                        break;
                    }
                    }
                })
                Swal.close();
                navigate('/dashboard', {
                    state: {
                        consoledata: homeStoreValue
                    },
                    });

                } catch (e) {
                }
            })
            .catch((e) => {
                Swal.close();
            });

    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen login-body">
            <div className="flex">
                <div className="hidden md:block">
                    <img
                        src={'banner_02.jpg'}
                        alt="Banner"
                        width={732}
                        height={550}
                        className="rounded-lg"
                    />
                </div>
                <div className="flex flex-col items-center bg-white p-8 shadow-lg rounded-md">
                    <img src={'logo.png'} alt="Logo" width={267} height={45} />

                    <input
                        type="text"
                        name="userId"
                        placeholder="USER ID"
                        value={form.userId}
                        onChange={handleInputChange}
                        className="input-login"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="PASSWORD"
                        value={form.password}
                        onChange={handleInputChange}
                        className="input-login"
                    />

                    <img
                        id="captcha"
                        src={simpleCaptcha}
                        alt="Captcha"
                        width={250}
                        height={44}
                        className="my-2"
                    />

                    <input
                        type="text"
                        name="captcha"
                        placeholder="CAPTCHA"
                        value={form.captcha}
                        onChange={handleInputChange}
                        className="input-login"
                    />

                    <button onClick={handleLogin} className="btn-login">LOGIN</button>

                    <div className="text-sm text-blue-600 cursor-pointer mt-2" onClick={() => alert('Forgot Password')}>FORGOT PASSWORD?</div>

                    <button className="btn-secondary" onClick={() => window.open('APK/CueTransPDO.apk')}>
                        <i className="fa fa-android"></i> Get our Android App
                    </button>

                    <button className="btn-secondary" onClick={() => alert('Load Feedback Form')}>
                        <i className="fa fa-comment-o"></i> Give Feedback
                    </button>

                    <div className="text-xs text-gray-500 mt-2">Powered by Cuecent</div>
                </div>
            </div>
        </div>
    );
};

export default Login;
