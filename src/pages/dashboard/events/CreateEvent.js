import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
import { ADD_EVENT, BASE } from "../../../API/Api";

function CreateProduct() {
  // Variables
  const nav = useNavigate();

  // *****************************************

  const [eventData, setEventData] = useState({
    id: 0,
    nameAr: "",
    nameEn: "",
    descriptionAr: "",
    descriptionEn: "",
    primeImageURL: "",
    startDay: "",
    endDay: "",
    startSellTicketDay: "",
    endSellTicketDay: "",
    eventDays: "",
    eventImages: [
      {
        id: 0,
        eventId: 0,
        imageURL: "",
      },
    ],
    eventDays: [
      {
        id: 0,
        eventId: 0,
        nameAr: "",
        nameEn: "",
        descriptionAr: "",
        descriptionEn: "",
        address: "",
        addressGPSLink: "",
        latitude: "",
        longitude: "",
        eventStartDay: "",
        noOfTickets: 0,
        price: 0,
        linkZoom: "",
        linkUploadedVideo: "",
        displayLinkUploadedVideo: "",
        isDeleted: false,
        eventDaySpeakers: [
          {
            id: 0,
            eventDayId: 0,
            speakerId: "",
            startSpeakTime: "",
            endSpeakTime: "",
          },
        ],
      },
    ],
  });

  
  // Handle Change
  function handleChange(e) {
    setEventData({ ...eventData, [e.target.id]: e.target.value });
  }
  const [primeImage, setPrimeImage] = useState("");
  eventData.primeImageURL = primeImage;
  const [eventImages, setEventImages] = useState([]);
  eventData.eventImages = eventImages;
  
  // *****************************************
  
  // Context Variable
  const context = useContext(User);
  const token = context.auth.token;
  
  // Submit Function
  async function submit(event) {
    // Testing
    window.localStorage.setItem("eventData", JSON.stringify(eventData));
    console.log(eventData);
    //
    event.preventDefault();
    //
    try {
      //
      let result = await axios.post(`${BASE}/${ADD_EVENT}`, eventData);
      // Testing
      console.log(result);
      // Navigate
      nav("/dashboard/events");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="inside-form inner-form">
      <form onSubmit={submit}>
        <h2 className="title">Create Event</h2>

        <div className="boxs">
          <div className="box">
            <label htmlFor="nameAr">Arabic Name</label>
            <input
              type="text"
              id="nameAr"
              placeholder="Event Name in Arabic"
              value={eventData.nameAr}
              required
              onChange={handleChange}
            />
          </div>

          <div className="box">
            <label htmlFor="nameEn">English Name</label>
            <input
              type="text"
              id="nameEn"
              placeholder="Event Name in English"
              value={eventData.nameEn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="box">
            <label htmlFor="descriptionAr">Arabic Description</label>
            <input
              type="text"
              id="descriptionAr"
              placeholder="Event Description in Arabic"
              value={eventData.descriptionAr}
              onChange={handleChange}
              required
            />
          </div>

          <div className="box">
            <label htmlFor="descriptionEn">English Description</label>
            <input
              type="text"
              id="descriptionEn"
              placeholder="Event Description in English"
              value={eventData.descriptionEn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="box">
            <label htmlFor="startDay">Start Day of Event</label>
            <input
              type="datetime-local"
              id="startDay"
              value={eventData.startDay}
              onChange={handleChange}
              required
            />
          </div>

          <div className="box">
            <label htmlFor="endDay">End Day of Event</label>
            <input
              type="datetime-local"
              id="endDay"
              value={eventData.endDay}
              onChange={handleChange}
              required
            />
          </div>

          <div className="box">
            <label htmlFor="startSellTicketDay">Start Sell Ticket Day</label>
            <input
              type="datetime-local"
              id="startSellTicketDay"
              value={eventData.startSellTicketDay}
              onChange={handleChange}
              required
            />
          </div>

          <div className="box">
            <label htmlFor="endSellTicketDay">Start Sell Ticket Day</label>
            <input
              type="datetime-local"
              id="endSellTicketDay"
              value={eventData.endSellTicketDay}
              onChange={handleChange}
              required
            />
          </div>

          <div className="box">
            <label htmlFor="eventDays">Event Days</label>
            <input
              type="number"
              id="eventDays"
              placeholder="Enter Number of Event Days"
              min="1"
              max="100"
              value={eventData.eventDays}
              onChange={handleChange}
              required
            />
          </div>

          <div className="box">
            <label htmlFor="primeImg" className="upload-image">
              <span>Upload Prime Image</span>
              <i className="fas fa-cloud-upload-alt"></i>
            </label>
            <input
              type="file"
              id="primeImg"
              // onChange={(e) => setImage(e.target.files.item(0))}
              onChange={(e) => setPrimeImage(e.target.files.item(0))}
            />
          </div>

          <div className="box">
            <label htmlFor="eventImages" className="upload-image">
              <span>Upload Event Images</span>
              <i className="fas fa-images"></i>
            </label>
            <input
              type="file"
              id="eventImages"
              multiple
              // onChange={(e) => setImage(e.target.files.item(0))}
              onChange={(e) => setEventImages(e.target.files.item(0))}
            />
          </div>
        </div>

        <button type="submit" className="btn">
          Create Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;

//
//
//
//TODO ----- Number of Event Days -----

// const [eventMultiDays, setEventMultiDays] = useState();
// console.log(eventMultiDays);
//
// <div className="box" style={{ border: "5px solid #999", margin: "20px 10px" }}>
// <label htmlFor="counter">Number of Event Days</label>
// <input
//   type="number"
//   min="0"
//   max="100"
//   id="counter"
//   placeholder="Event the Number of Event Days"
//   required
//   onChange={(e) => setEventMultiDays(e.target.value)}
// />
// </div>

// *****************************************

//TODO Email has already been taken --> appear after correcting it (Problem)
// function print() {
//   console.log(eventData);
//   console.log(eventData.eventImages);
//   //
//   window.localStorage.setItem("eventDaysInfo", JSON.stringify(eventDaysInfo));
//   window.localStorage.setItem("eventData", JSON.stringify(eventData));
//   //
// }
//

// *****************************************

//TODO ----- Headers of Request -----
// , {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// }
