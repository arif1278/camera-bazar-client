import { useEffect, useState } from "react"

// Hook to get secret token
const useToken = (email) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        if (email) {
            fetch(`https://b612-used-products-resale-server-side-arif1278.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('camerabazarsecrettoken', data.accessToken);
                        setToken(data.accessToken);
                    }
                })
                .catch(error => console.log(error))
        }
    }, [email])

    return [token]
}

export default useToken;



