import eth from "../../../public/assets/img/svgs/crypto-currencies/eth.svg";
import xrp from "../../../public/assets/img/svgs/crypto-currencies/xrp.svg";
import ltc from "../../../public/assets/img/svgs/crypto-currencies/ltc.svg";
import xmr from "../../../public/assets/img/svgs/crypto-currencies/xmr.svg";
import steem from "../../../public/assets/img/svgs/crypto-currencies/steem.svg";
import dash from "../../../public/assets/img/svgs/crypto-currencies/dash.svg";
import waves from "../../../public/assets/img/svgs/crypto-currencies/waves.svg";
import user2 from "../../../public/assets/img/users/2.jpg";
import user3 from "../../../public/assets/img/users/3.jpg";
import user4 from "../../../public/assets/img/users/4.jpg";
import user5 from "../../../public/assets/img/users/5.jpg";
import user6 from "../../../public/assets/img/users/6.jpg";
import user7 from "../../../public/assets/img/users/7.jpg";
import user9 from "../../../public/assets/img/users/9.jpg";
import user11 from "../../../public/assets/img/users/11.jpg";
import btc from "../../../public/assets/img/svgs/crypto-currencies/btc.svg";


export const columns = [
    {
        name: "", selector: row => [row.SNO],
        sortable: true,
        cell: row =>
            <span className="crypto-icon bg-primary-transparent me-3 my-auto">
                <i className={`fe fe-arrow-${row.direction}-${row.position} text-primary`}></i></span>
    },

    {
        name: "TRANSACTION HASH",
        selector: row => [row.transaction],
        cell: row => <div className="font-weight-bold">
            {row.transaction}
        </div>,
        sortable: true
    },
    {
        name: "DATE",
        selector: row => [row.date],
        sortable: true,
        cell: row =>
            <div>
                {row.date}
            </div>

    },
    {
        name: "FROM",
        selector: row => [row.from],
        sortable: true,
        cell: row =>
            <div>
                {row.from}
            </div>
    },
    {
        name: "TO",
        selector: row => [row.to],
        cell: row =>
            <div className="d-flex my-auto">
                <div className="avatar avatar-sm me-2">
                <img src={row.idcard}
                    alt=""
                />
                </div>
                <span className="my-auto">{row.to}</span>
            </div>,

        sortable: true,

    },
    {
        name: "COIN",
        selector: row => [row.currency],
        sortable: true,
        cell: row =>
            <div className="font-weight-semibold">
                <div className="d-flex my-auto">
                    <div className="avatar avatar-sm me-2">
                    <img
                        src={row.currency}
                        alt=""
                    />
                    </div>
                    <span className="my-auto">{row.currencyname}</span>
                </div>
            </div>

    },
    {
        name: "AMOUNT",
        selector: row => [row.winning],
        sortable: true,
        cell: row =>
            <div className={`text-${row.winning} font-weight-bold`}>
                {row.profit}
            </div>
    },

    {
        name: "STATUS",
        selector: row => [row.winning],
        sortable: true,
        cell: row => <div className={`text-${row.winning} font-weight-bold`}>
            {row.taskinformation}
        </div>
    },
];

export const data = [
    {

        direction: "up",
        position: "right",
        transaction: "#1242232401",
        date: "03/12/2020",
        from: "Olive Yew",
        idcard: user11,
        to: "PegLegge",
        currency: btc,
        currencyname: "Bitcoin",
        profit: "+0.041",
        winning: "success",
        taskinformation: "COMPLETED",
    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232402",
        date: "05/12/2020",
        from: "Addie Minstra",
        idcard: user2,
        to: "Art Decco",
        currency: eth,
        currencyname: "Ethereum",
        profit: "	-0.344",
        winning: "danger",
        taskinformation: "CANCELLED"
    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232403",
        date: "14/12/2020",
        from: "Stan Dupp",
        idcard: user3,
        to: "Neil Down",
        currency: xrp,
        currencyname: "Ripple",
        profit: "-0.345",
        winning: "muted",
        taskinformation: "PENDING"
    },
    {
        position: "right",
        direction: "up",
        transaction: "#1242232404",
        date: "16/12/2020",
        from: "Penny Black",
        idcard: user4,
        to: "Anna Domino",
        currency: dash,
        currencyname: "Dash",
        profit: "+0.132",
        winning: "success",
        taskinformation: "COMPLETED"

    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232405",
        date: "08/12/2020",
        from: "Olive Yew",
        idcard: user5,
        to: "Paul Misunday",
        currency: ltc,
        currencyname: "litecoin	",
        profit: "-0.523	",
        winning: "danger",
        taskinformation: "CANCELLED"
    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232406",
        date: "20/12/2020",
        from: "Arty ficial",
        idcard: user6,
        to: "Marsha Mello",
        currency: xmr,
        currencyname: "Monero",
        profit: "-0.232",
        winning: "muted",
        taskinformation: "COMPLETED"
    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232409",
        date: "03/12/2020",
        from: "Stew Gots",
        idcard: user9,
        to: "Sara Bellum",
        currency: waves,
        currencyname: "Waves",
        profit: "-0.326",
        winning: "muted",
        taskinformation: "PENDING"
    },
    {
        position: "right",
        direction: "up",
        transaction: "#1242232418",
        date: "20/12/2020",
        from: "Donatella Nobatt",
        idcard: user7,
        to: "Peg Legge",
        currency: steem,
        currencyname: "Steem",
        profit: "+0.041",
        winning: "success",
        taskinformation: "COMPLETED"
    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232405",
        date: "08/12/2020",
        from: "Olive Yew",
        idcard: user5,
        to: "Paul Misunday",
        currency: ltc,
        currencyname: "litecoin	",
        profit: "-0.523	",
        winning: "danger",
        taskinformation: "CANCELLED"
    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232403",
        date: "14/12/2020",
        from: "Stan Dupp",
        idcard: user3,
        to: "Neil Down",
        currency: xrp,
        currencyname: "Ripple",
        profit: "-0.345",
        winning: "muted",
        taskinformation: "PENDING"
    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232403",
        date: "24/12/2020",
        from: "Stan Dupp",
        idcard: user6,
        to: "Neil Down",
        currency: xrp,
        currencyname: "Ripple",
        profit: "-0.345",
        winning: "muted",
        taskinformation: "PENDING"
    },

    {
        position: "right",
        direction: "up",
        transaction: "#1242232418",
        date: "20/12/2020",
        from: "Donatella Nobatt",
        idcard: user7,
        to: "Peg Legge",
        currency: steem,
        currencyname: "Steem",
        profit: "+0.041",
        winning: "success",
        taskinformation: "COMPLETED"
    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232406",
        date: "14/12/2020",
        from: "Stan Dupp",
        idcard: user3,
        to: "Neil Down",
        currency: xrp,
        currencyname: "Ripple",
        profit: "-0.345",
        winning: "muted",
        taskinformation: "PENDING"
    },
    {
        position: "right",
        direction: "up",
        transaction: "#1242232404",
        date: "16/12/2020",
        from: "Penny Black",
        idcard: user4,
        to: "Anna Domino",
        currency: dash,
        currencyname: "Dash",
        profit: "+0.132",
        winning: "success",
        taskinformation: "COMPLETED"

    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232405",
        date: "08/12/2020",
        from: "Olive Yew",
        idcard: user5,
        to: "Paul Misunday",
        currency: ltc,
        currencyname: "litecoin	",
        profit: "-0.523	",
        winning: "danger",
        taskinformation: "CANCELLED"
    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232406",
        date: "20/12/2020",
        from: "Arty ficial",
        idcard: user6,
        to: "Marsha Mello",
        currency: xmr,
        currencyname: "Monero",
        profit: "-0.232",
        winning: "muted",
        taskinformation: "COMPLETED"
    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232409",
        date: "03/12/2020",
        from: "Stew Gots",
        idcard: user9,
        to: "Sara Bellum",
        currency: waves,
        currencyname: "Waves",
        profit: "-0.326",
        winning: "muted",
        taskinformation: "PENDING"
    },
    {
        position: "right",
        direction: "up",
        transaction: "#1242232418",
        date: "20/12/2020",
        from: "Donatella Nobatt",
        idcard: user7,
        to: "Peg Legge",
        currency: steem,
        currencyname: "Steem",
        profit: "+0.041",
        winning: "success",
        taskinformation: "COMPLETED"
    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232405",
        date: "08/12/2020",
        from: "Olive Yew",
        idcard: user5,
        to: "Paul Misunday",
        currency: ltc,
        currencyname: "litecoin	",
        profit: "-0.523	",
        winning: "danger",
        taskinformation: "CANCELLED"
    },
    {
        position: "left",
        direction: "down",
        transaction: "#1242232403",
        date: "14/12/2020",
        from: "Stan Dupp",
        idcard: user3,
        to: "Neil Down",
        currency: xrp,
        currencyname: "Ripple",
        profit: "-0.345",
        winning: "muted",
        taskinformation: "PENDING"
    },
]

export const tableData = {
    columns,
    data,
};