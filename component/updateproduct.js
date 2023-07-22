import Image from "next/image";


export default function ProductCard(props) {
  const handleView = (e) => {
    const id = e.target.parentNode.id;
    console.log(id);
  };

  const ele = props.data;
  console.log(ele);

  const handleit = (e) => {
    console.log(e.target);
    props.onClick(e.target.id)
  };

  return (
    <>

      <div className="item" style={{ Width: "300", height: "280px", color: "black", borderRadius: "8px" }} >
        <h4 style={{ width: "280px" }}>{ele.name}</h4>
        <Image src={ele.img1} alt="Img1" width={280} height={150} style={{ borderRadius: "8px" }} />
        <div className="" id={ele._id} onClick={handleit} style={{ backgroundColor: "blue", textAlign: "center", width: "280px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", borderRadius: "5px", cursor: "pointer" }}>
          View it
        </div>
        <style jsx>{`

        .item {
          width: calc(33.33% - 10px);
          height: 200px;
          margin-bottom: 80px;
          padding: 20px;
          background-color: #f2f2f2;
          box-sizing: border-box;
          min-width:350px;
        }
        @media screen and (max-width: 768px) {
          .item {
            width: 50%;
          }
        }
      `}</style>

      </div>


    </>
  );
}
