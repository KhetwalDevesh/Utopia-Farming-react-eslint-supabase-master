import React from "react";
import { useState, useEffect } from "react";
import { createNewMessage, deleteMessage, supabase } from "../../utils";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";

function Community() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  async function init() {
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*");
    //console.log(messages);
    console.log("inside init");
    console.log(messages);
    setMessages(messages);
  }

  async function subscribeToChanges() {
    try {
      await supabase
        .from("messages")
        .on("INSERT", (message) => {
          console.log("Change received!", message);
          init();
        })
        .subscribe();
      console.log(messages, "☝️");

      //setMessages(messages);
    } catch (error) {}
  }

  useEffect(() => {
    //reset();
    init();
    subscribeToChanges();
  }, []);

  //console.log(JSON.stringify(messages, null, 2));

  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      let publicImageURL = null;
      console.log(data);
      if (data.imgUrl.length === 1) {
        console.log(data.imgUrl);
        const file = data.imgUrl[0];
        const fileExt = file.name.split(".").pop();
        const fileName = Math.random() + "." + fileExt;
        console.log(fileName);
        const uploadedImage = await supabase.storage
          .from("images")
          .upload(fileName, file);
        //console.log(uploadedImage);

        publicImageURL = await supabase.storage
          .from("images")
          .getPublicUrl(uploadedImage.data.Key);

        publicImageURL = publicImageURL.publicURL.replace("/images", "");
      }

      console.log(data.username, data.content, publicImageURL);
      const messageDetails = {
        username: data.username,
        content: data.content,
        img_url: publicImageURL,
      };
      console.log("messageDetails", JSON.stringify(messageDetails, null, 2));
      if (messageDetails.username == "") return;
      if (messageDetails.content == "" && messageDetails.img_url == null)
        return;
      createNewMessage(messageDetails);
      // reset();
      setValue("content", "");
      setValue("imgUrl", "");
      const parentContainer = document.getElementById("parentContainer");
      parentContainer.scrollTo(0, 900000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[100vh] p-16 flex flex-col gap-8">
      <Toaster />
      <div className="h-[70vh] overflow-y-auto box" id="parentContainer">
        {messages.map((msg) => {
          return (
            <div
              key={msg.id}
              className="flex justify-evenly items-center space-x-40 m-5 p-2 bg-slate-300 rounded-t-lg rounded-br-lg relative"
            >
              <div className="absolute left-10">
                <img
                  src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-1"
                />
                {msg.username}
              </div>
              <div className="">
                <div>{msg.content}</div>
                <br />
                {msg.img_url && (
                  <img className="w-96 h-96" src={msg.img_url} alt="No image" />
                )}
                <div className="right-0 bottom-0 text-xs flex space-x-3">
                  <span>{msg.created_at.substring(0, 10)}</span>
                  <span>{msg.created_at.substring(11, 19)}</span>
                </div>
              </div>
              <div className="w-fit flex items-center hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => {
                    const response = deleteMessage(msg.id);
                    setTimeout(() => init(), 100);
                    // toast.success("Message deleted successfully");
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* below is the message form */}
      <div className="p-5 h-[20vh] box">
        <form
          className="flex space-x-10 h-fit"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>Username</label>
          <br />
          <input
            className="p-1 border-2 rounded-md border-black"
            placeholder="username"
            {...register("username")}
          />

          <label>Message</label>
          <br />
          <input
            className="p-1 border-2 rounded-md border-black w-[40rem]"
            placeholder="message"
            {...register("content")}
          />

          <input
            type="file"
            id="img-file"
            accept=".jpg, .jpeg, .png"
            style={{ display: "none" }}
            {...register("imgUrl")}
          />
          <label htmlFor="img-file">
            <i className="fas fa-camera text-3xl cursor-pointer"></i>
          </label>
          <input
            className="send-button px-3 py-1 bg-blue-800 rounded-sm text-white cursor-pointer active:translate-y-2"
            type="submit"
            value="Send"
            //onClick={() => reset()}
          />
        </form>
      </div>
    </div>
  );
}

export default Community;
