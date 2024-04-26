import React, {useEffect, useState} from 'react';
import {CSVLink} from 'react-csv';
import InfiniteScroll from "react-infinite-scroll-component";
import {faker} from '@faker-js/faker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {generateUserData} from "../utils/generateUserData";

const UserDataTable = ({region, errorPerRecord, seed}) => {
    const [userData, setUserData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalLoaded, setTotalLoaded] = useState(20);
    const [localFaker, setLocalFaker] = useState(null);

    const fetchUserData = (selectedRegion, seed, totalLoaded) => {
        const loadLocale = async (selectedRegion) => {
            try {
                let locale;
                switch (selectedRegion) {
                    case 'pl':
                        locale = await import('@faker-js/faker/locale/pl');
                        break;
                    case 'de':
                        locale = await import('@faker-js/faker/locale/de');
                        break;
                    case 'el':
                        locale = await import('@faker-js/faker/locale/el');
                        break;
                    case 'es':
                        locale = await import('@faker-js/faker/locale/es');
                        break;
                    case 'ja':
                        locale = await import('@faker-js/faker/locale/ja');
                        break;
                    case 'ru':
                        locale = await import('@faker-js/faker/locale/ru');
                        break;
                    case 'he':
                        locale = await import('@faker-js/faker/locale/he');
                        break;
                    case 'uk':
                        locale = await import('@faker-js/faker/locale/uk');
                        break;
                    default:
                        locale = await import('@faker-js/faker/locale/en');
                        break;
                }
                const localFaker = locale.faker;
                setLocalFaker(localFaker);
                const newSeed = parseInt(seed, 10);
                setUserData(generateUserData(localFaker, totalLoaded, errorPerRecord, selectedRegion, newSeed));
            } catch (error) {
                console.error('Error loading locale:', error);
            }
        };
        loadLocale(selectedRegion);
    };

    useEffect(() => {
        fetchUserData(region, seed, totalLoaded);
    }, [region, errorPerRecord, seed]);

    const fetchMoreData = () => {
        setTimeout(() => {
            setPage(page + 1);
            const newSeed = parseInt(seed, 10) + page;
            const newData = generateUserData(localFaker, 10, errorPerRecord, region, newSeed);
            setUserData(prevData => [...prevData, ...newData]);
            setTotalLoaded(prevTotal => prevTotal + 10);
        }, 1500);
    };

    return (
        <div className='w-100 d-flex flex-column justify-content-center align-items-center mt-5'>
            <div className="text-center mt-3">
                <CSVLink data={userData} filename={'user_data.csv'} className="btn btn-outline-warning mb-4">
                    Export
                </CSVLink>
            </div>
            <h1 className='fs-2 m-2'>Fake users</h1>
            <div className="user-data-table d-flex align-items-center mt-3">
                <InfiniteScroll
                    dataLength={userData.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>No more data</p>}
                >
                    <table className="table table-hover table-bordered">
                        <thead>
                        <tr>
                            <th>Index</th>
                            <th>Random Identifier</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userData.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{faker.string.uuid()}</td>
                                <td>{user.name}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default UserDataTable;
