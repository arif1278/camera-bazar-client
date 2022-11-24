import React from 'react';

const Banner = () => {
    return (
        <div className="hero bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPlvZ2RpBVJhZyex3fUOZ_t4tYd3s_MPGBnQ&usqp=CAU" className="max-w-sm h-60 rounded-lg shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold">Less price you can afford </h1>
                    <p className="py-6">We buy DSLR and mirrorless cameras, film SLR and rangefinder cameras, lenses and accessories from all the top brands like Canon, Nikon, Sony, Fujifilm, Olympus, Panasonic, Pentax, Ricoh, Leica, Hasselblad, Rollei, Phase One, Mamiya, Sigma, Tamron, Tokina, Voigtlander, Zeiss, Minolta, Contax, Konica, Polaroid, Mint, Linhof, GoPro, and so many more.

Got bags, tripods, gimbals, flashes, memory cards, filters, film backs, and the like? We buy those too, from brands like Manfrotto, Lowepro, Gitzo, Godox, Bowens, Hoya, Metabones, Peak Design, Profoto, Think Tank, Tiffen, and more.

All the best camera equipment, then and now.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;