import Link from 'next/link'
import Layout from '../../components/LayoutSub'
import { useRouter } from 'next/router'
import NProgress from '../../components/nprogress';
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import withApollo from "../../lib/apollo";

const API_URL = process.env.API_URL
const CREATE_USER = gql`mutation createNewUser($phone: String!, $password: String!, $full_name: String!, $call_name: String!, $birth_date: String!) { userSave(phone: $phone, password: $password, name: $full_name, call_name: $call_name, birth_date: $birth_date) { id } }`;

const RegisterMember = props => {
    const router = useRouter()
    const [full_name, setFullName] = useState("");
    const [call_name, setCallName] = useState("");
    const [birth_date, setBirthDate] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [createUser, { error, data }] = useMutation(CREATE_USER, {
        variables: { phone, password, full_name, call_name, birth_date },
        update: (proxy, mutationResult) => {
        //   const { allPosts } = proxy.readQuery({
        //     query: GET_POSTS,
        //     variables: { first: 10, skip: 0 }
        //   });
          const newPost = mutationResult.data.createUser;
        //   proxy.writeQuery({
        //     query: GET_POSTS,
        //     variables: { first: 10, skip: 0 },
        //     data: {
        //       allPosts: [newPost, ...allPosts]
        //     }
        //   });
        }
      });
    
    async function handleSubmit(e) {
		e.preventDefault()

        NProgress.start()

        createUser();

        router.push('/')
	}

    return (
        <Layout title="Cira App">
            <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full bg-white shadow-md rounded px-5 pt-6 pb-8">
                <div className="text-center"><img className="mx-auto" src="/img/logo/cira_trans_colored.webp" style={{ width: '70px' }} /></div>
                <h1 className="mt-2 block text-gray-700 font-bold mb-2 text-xl text-center">Daftar jadi member Cira</h1>
                <br/>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nama Lengkap
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="full_name" id="full_name" onChange={e => setFullName(e.target.value)} type="text" required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nama Panggilan
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="call_name" id="call_name" onChange={e => setCallName(e.target.value)} type="text" required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Tanggal Lahir
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="birthdate" id="birthdate" onChange={e => setBirthDate(e.target.value)} type="date" placeholder="Ingresa tu Fecha de Nacimiento" required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nomor HP
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="phone" id="phone" onChange={e => setPhone(e.target.value)} type="number" required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <div>Tentukan password untuk akun member kamu.</div>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="password" id="password" onChange={e => setPassword(e.target.value)} type="password" required/>
                </div>
                <div className="flex items-center justify-between">
                    <button id="submit"
                        className="bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        <i className="fab fa-whatsapp"></i> Daftar Sekarang
                    </button>
                </div>
                <div>Sudah punya jadi member? <Link href="/login"><a>Login</a></Link></div>
            </form>
        </div>
        
        </Layout>
    )
}

export default withApollo({ ssr: true })(RegisterMember);