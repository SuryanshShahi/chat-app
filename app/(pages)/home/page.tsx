"use client";
import clsx from "clsx";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { LuSend } from "react-icons/lu";
import AppContext from "../../context";
import { removeCookie } from "../../utils/cookies";
import { localStorageKeys } from "../../utils/enum";
import { removeLocalItem } from "../../utils/localstorage";
import { Modal } from "../../shared/Modal";
import InputField from "../../shared/InputField";
import Button from "../../shared/Button";
import useHook from "./useHook";
import { FaRegTrashCan } from "react-icons/fa6";

export default function Home() {
  const router = useRouter();
  const {
    isAddingContact,
    handleSubmit,
    handleChange,
    values,
    contacts,
    userInfo,
    isAddGuestModalOpen,
    setIsAddGuestModalOpen,
    deleteContactFn,
    selectedUser,
    setSelectedUser,
    isOnline,
  } = useHook();
  const { socket, messages, user } = useContext(AppContext);

  const [message, setMessage] = useState("");
  const ids = [socket?.id, selectedUser?.id].sort();
  const conversationKey = `${ids[0]}-${ids[1]}`;
  console.log("🚀 ~ Home ~ messages:", messages, contacts, conversationKey);
  const getUnreadMessages = (id: string) => {
    const ids = [socket?.id, id].sort();
    const conversationKey = `${ids[0]}-${ids[1]}`;
    return messages[conversationKey]?.filter((item) => item?.id !== socket?.id);
  };
  if (!contacts.length) return <div>Loading...</div>;
  return (
    <>
      <div className="bg-neutral-900 h-screen flex items-center">
        <div className="max-w-[300px] w-full shadow-sm rounded-lg p-4 h-full border-r border-neutral-800 gap-y-4 flex flex-col">
          <div className="space-y-4">
            <div className="text-white text-2xl font-bold text-center">
              Welcome to the chat
            </div>
            <Button
              variant="outline-dashed"
              className="w-full"
              onClick={() => setIsAddGuestModalOpen(true)}
            >
              Add Guests
            </Button>

            <div className="border-b border-neutral-800" />
          </div>
          {contacts.map((item, idx) => {
            const unreadMessages = getUnreadMessages(item?.id);
            return (
              <div
                key={item.id + idx}
                className={clsx(
                  "text-white text-sm border border-neutral-800 rounded-xl p-4 flex gap-x-2 relative cursor-pointer",
                  selectedUser?.id === item.id && "bg-neutral-800"
                )}
                onClick={() =>
                  setSelectedUser({
                    id: item?.id,
                    name: item?.name || item?.phone || "",
                  })
                }
              >
                <div className="flex items-center gap-x-2">
                  <div className="h-10 min-w-10 uppercase rounded-full border border-blue-500 bg-neutral-800 flex items-center justify-center">
                    {item?.name?.charAt(0)}
                  </div>
                  <div className="">
                    <div>
                      {item?.name} {item?.id === userInfo?.userId && " (You)"}
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      {unreadMessages?.[unreadMessages?.length - 1]?.message}
                    </div>
                  </div>
                </div>
                <div
                  className={clsx(
                    "line-clamp-1 text-[8px] ml-auto -mt-2",
                    Boolean(getUnreadMessages(item?.id)?.length)
                      ? "text-green-500"
                      : "text-neutral-500"
                  )}
                >
                  {moment(
                    unreadMessages?.[unreadMessages?.length - 1]?.createdAt
                  ).fromNow()}
                </div>
                {Boolean(getUnreadMessages(item?.id)?.length) && (
                  <div className="line-clamp-1 text-[10px] font-medium bg-green-500 text-black px-[6px] py-[2px] leading-3 rounded-full ml-auto absolute bottom-4 right-4">
                    {getUnreadMessages(item?.id)?.length}
                  </div>
                )}
              </div>
            );
          })}

          <div className="space-y-4 mt-auto">
            <div className="border-b border-neutral-800" />
            <div
              className="text-red-500 text-sm text-center cursor-pointer"
              onClick={() => {
                removeCookie(localStorageKeys.AUTH_TOKEN);
                removeLocalItem(localStorageKeys.AUTH_TOKEN);
                router.push("/login");
              }}
            >
              Logout
            </div>
          </div>
        </div>
        {selectedUser && (
          <div className="h-[calc(100vh-100px)] max-w-[700px] mx-auto w-full flex flex-col justify-between px-5">
            <div className="space-y-6">
              <div className="text-white text-sm rounded-xl p-4 flex items-center gap-x-2">
                <div className="h-10 min-w-10 rounded-full border border-blue-500 bg-neutral-800 flex items-center justify-center">
                  U
                </div>
                <div className="">
                  <div>
                    {selectedUser?.name}@{selectedUser?.id}
                  </div>
                  <div>{socket?.id}</div>
                  <div
                    className={clsx(
                      "line-clamp-1 overflow-hidden transition-all duration-300 ease-in-out",
                      isOnline ? "h-4" : "h-0"
                    )}
                  >
                    <span
                      className={clsx(
                        "duration-[1s] text-xs",
                        isOnline ? "opacity-100" : "opacity-0"
                      )}
                    >
                      online
                    </span>
                  </div>
                </div>
                {selectedUser?.id !== userInfo?.userId && (
                  <FaRegTrashCan
                    onClick={() => deleteContactFn(selectedUser?.id)}
                    size={20}
                    className="text-red-500 cursor-pointer ml-auto"
                  />
                )}
              </div>
              <div className="overflow-scroll max-h-[calc(100vh-260px)] space-y-4">
                {messages[conversationKey]?.map((item, idx) => (
                  <div
                    className={clsx(
                      "w-max gap-y-1 flex flex-col",
                      item?.id === socket?.id && "ml-auto items-end"
                    )}
                    key={item.id + idx}
                  >
                    <div
                      className={clsx(
                        "text-white py-2 px-4 text-sm rounded-full w-max",
                        item?.id === socket?.id
                          ? "bg-blue-500"
                          : "bg-neutral-800"
                      )}
                    >
                      {item?.message}
                    </div>
                    <div
                      className={clsx("text-[10px] text-gray-500 text-center")}
                    >
                      {moment(item?.createdAt).fromNow()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("🚀 ~ onSubmit ~ message:", message);
                if (!message) return;
                socket?.emit("private:message", {
                  message,
                  targetUserId: selectedUser?.id,
                });
                setMessage("");
              }}
              className="flex gap-x-2 items-center mt-auto relative"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-12 rounded-full outline-none w-full px-4"
                placeholder="Type your message here..."
              />
              <button
                type="submit"
                className="bg-blue-500 h-10 px-4 rounded-full cursor-pointer absolute right-1"
              >
                <LuSend size={20} className="text-white" />
              </button>
            </form>
          </div>
        )}
      </div>
      <Modal
        isOpen={isAddGuestModalOpen}
        close={() => setIsAddGuestModalOpen(false)}
        className="p-5 space-y-6"
        size="sm"
      >
        <div className="text-white text-2xl font-medium text-center">
          Fill Guest Details
        </div>
        <div className="space-y-4">
          <InputField
            type="text"
            className="w-full"
            placeholder="Enter name"
            onChange={handleChange("name")}
            value={values.name}
          />
          <InputField
            type="tel"
            className="w-full"
            placeholder="Enter phone"
            onChange={handleChange("phone")}
            value={values.phone}
          />
          <InputField
            type="text"
            className="w-full"
            placeholder="Enter email"
            onChange={handleChange("email")}
            value={values.email}
          />
        </div>
        <Button
          className="!w-full"
          disabled={isAddingContact}
          onClick={() => handleSubmit()}
        >
          {isAddingContact ? "Adding..." : "Add Guest"}
        </Button>
      </Modal>
    </>
  );
}
