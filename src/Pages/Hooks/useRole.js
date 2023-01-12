import { useEffect, useState } from "react"

// Hook to get user role
const useRole = (email) => {
    const [role, setRole] = useState('');
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setRole(data.role);
                    setRoleLoading(false);
                })
                .catch(error => console.log(error))
        }
    }, [email])

    return [role, roleLoading];
}

export default useRole;