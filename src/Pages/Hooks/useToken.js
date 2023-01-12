import { useEffect, useState } from "react"

// Hook to get secret token
const useToken = (email) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/jwt?email=${email}`)
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



