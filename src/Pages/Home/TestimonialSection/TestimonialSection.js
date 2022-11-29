import React from 'react';
import { FaStar } from 'react-icons/fa';

const TestimonialSection = () => {
    return (
        <section className='container mx-auto max-w-screen-xl px-2 md:px-4 xl:px-0 '>
            <div>
                <h2 className="text-2xl font-bold">Customers Reviews</h2>
                <div className='divider bg-neutral-content h-0.5 opacity-50 mt-2 mb-6'></div>

                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
                    <div>
                        <img alt="Woman" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" className="mx-auto h-14 w-14 rounded-full object-cover shadow-xl" />
                        <blockquote className="flex flex-col justify-between rounded-lg p-6 text-center shadow-xl">
                            <p className="text-lg font-bold">Sophie Lennon</p>
                            <p className="mt-1 text-xs font-medium">Receptionist at Office</p>
                            <p className="mt-4 text-sm">Items are received. All in the good condition. The watch come with the box and bubble wrap. So far no scratch on two watches. Thanks seller.</p>
                            <div className="mt-6 flex justify-center gap-1 text-amber-300 text-lg">
                                <FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar>
                            </div>
                        </blockquote>
                    </div>
                    <div>
                        <img alt="Woman" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" className="mx-auto h-14 w-14 rounded-full object-cover shadow-xl" />
                        <blockquote className="flex flex-col justify-between rounded-lg p-6 text-center shadow-xl">
                            <p className="text-lg font-bold">Sharon Ehman</p>
                            <p className="mt-1 text-xs font-medium">Digital Marketing at Studio</p>
                            <p className="mt-4 text-sm">Delivery was fast, shipped out a day after purchase. Took 2 days to arrived. Packaging was neat and secured. The band is in good condition & functioning well by far. </p>
                            <div className="mt-6 flex justify-center gap-1 text-amber-300 text-lg">
                                <FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar>
                            </div>
                        </blockquote>
                    </div>
                    <div>
                        <img alt="Man" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" className="mx-auto h-14 w-14 rounded-full object-cover shadow-xl" />
                        <blockquote className="flex flex-col justify-between rounded-lg p-6 text-center shadow-xl">
                            <p className="text-lg font-bold">Chris Paul</p>
                            <p className="mt-1 text-xs font-medium">Administrative Assistant at Center</p>
                            <p className="mt-4 text-sm">Love everything about this watch. After use a few weeks strap still look new. Won't easily to get dirt. Very nice color. Worth buying. Tq seller.</p>
                            <div className="mt-6 flex justify-center gap-1 text-amber-300 text-lg">
                                <FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;