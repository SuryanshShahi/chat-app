"use client";
import clsx from "clsx";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import { LuArrowLeft, LuMenu, LuSend } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import AppContext from "../../context";
import { removeCookie } from "../../utils/cookies";
import { localStorageKeys } from "../../utils/enum";
import { removeLocalItem } from "../../utils/localstorage";
import { Modal } from "../../shared/Modal";
import InputField from "../../shared/InputField";
import Button from "../../shared/Button";
import UserAvatar from "../../shared/UserAvatar";
import StatusPanel from "../../shared/StatusPanel";
import Loader from "../../shared/Loader";
import useHook from "./useHook";

function getConversationKey(a?: string | null, b?: string | null) {
  if (!a || !b) return "";
  return [a, b].sort().join("-");
}

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
    isContactsLoading,
  } = useHook();

  const { socket, messages } = useContext(AppContext);
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentUserId = userInfo?.userId;
  const peerUserId = selectedUser?.userId ?? null;

  const conversationKey = useMemo(
    () => getConversationKey(currentUserId, peerUserId),
    [currentUserId, peerUserId]
  );

  const getUnreadMessages = (targetUserId?: string | null) => {
    const key = getConversationKey(currentUserId, targetUserId);
    if (!key) return [];
    return (messages[key] || []).filter(
      (m) => m.senderUserId && m.senderUserId !== currentUserId
    );
  };

  if (isContactsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b141a] px-4">
        <StatusPanel title="Loading chats...">
          <div className="mt-4 flex items-center justify-center text-emerald-400">
            <Loader className="h-5 w-5 border-[3px]" />
          </div>
        </StatusPanel>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex min-h-screen bg-[#0b141a] text-[#e9edef]">
        {isSidebarOpen && (
          <button
            className="fixed inset-0 z-20 bg-black/30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close contacts panel"
          />
        )}
        <aside
          className={clsx(
            "fixed inset-y-0 left-0 z-30 flex h-screen w-full max-w-[340px] flex-col border-r border-[#2a3942] bg-[#111b21] p-4 transition-transform duration-300 md:static md:z-auto md:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-semibold text-[#e9edef]">WhatsApp</h1>
              <p className="text-xs text-[#8696a0]">Chats</p>
            </div>
            <Button
              variant="outline-dashed"
              className="h-10 w-full rounded-xl border-emerald-500/60 text-emerald-300"
              onClick={() => setIsAddGuestModalOpen(true)}
            >
              Add Guest
            </Button>
            <div className="border-b border-[#2a3942]" />
          </div>

          <div className="mt-4 space-y-2 overflow-y-auto pr-1">
            {contacts.map((item, idx) => {
              const unreadMessages = getUnreadMessages(item?.userId);
              return (
                <button
                  key={`${item.id}-${idx}`}
                  className={clsx(
                    "relative flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-left transition-all hover:bg-[#202c33]",
                    selectedUser?.id === item.id &&
                      "border-[#2a3942] bg-[#202c33] shadow-[inset_0_0_0_1px_rgba(0,168,132,0.35)]"
                  )}
                  onClick={() => {
                    setSelectedUser({
                      id: item.id,
                      userId: item.userId,
                      name: item.name || item.phone || "",
                      phone: item.phone || "",
                    });
                    setIsSidebarOpen(false);
                  }}
                >
                  <UserAvatar
                    name={item?.name || item?.phone}
                    className="h-10 min-w-10"
                  />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-[#e9edef]">
                      {item?.name} {item?.userId === userInfo?.userId && "(You)"}
                    </div>
                    <div className="truncate text-xs text-[#8696a0]">
                      {unreadMessages?.[unreadMessages.length - 1]?.message ||
                        "No unread messages"}
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col items-end gap-1">
                    <span
                      className={clsx(
                        "text-[10px]",
                        unreadMessages.length ? "text-emerald-400" : "text-[#8696a0]"
                      )}
                    >
                      {unreadMessages.length
                        ? moment(
                            unreadMessages[unreadMessages.length - 1]?.createdAt
                          ).fromNow()
                        : ""}
                    </span>
                    {unreadMessages.length > 0 && (
                      <span className="rounded-full bg-[#25d366] px-2 py-[1px] text-[10px] font-semibold text-[#0b141a]">
                        {unreadMessages.length}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-auto space-y-4 pt-4">
            <div className="border-b border-[#2a3942]" />
            <Button
              variant="ghost"
              className="h-10 w-full justify-center rounded-xl text-red-400 hover:bg-red-500/10"
              onClick={() => {
                removeCookie(localStorageKeys.AUTH_TOKEN);
                removeLocalItem(localStorageKeys.AUTH_TOKEN);
                router.push("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </aside>

        <main
          className={clsx(
            "h-screen w-full flex-1 flex-col bg-[#0b141a]",
            isSidebarOpen ? "hidden md:flex" : "flex"
          )}
        >
          {selectedUser ? (
            <>
              <div className="flex items-center gap-3 border-b border-[#2a3942] bg-[#202c33] md:px-6 px-4 py-4">
                <button
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#8696a0] transition-colors hover:bg-[#111b21] hover:text-[#e9edef] md:hidden"
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Open contacts panel"
                >
                  <LuArrowLeft size={18} />
                </button>
                <UserAvatar name={selectedUser?.name} className="h-10 w-10" />
                <div>
                  <div className="text-sm font-medium text-[#e9edef]">
                    {selectedUser?.name}
                  </div>
                  <div className="text-xs text-[#8696a0]">
                    {isOnline ? "Online" : "Offline"}
                  </div>
                </div>

                {selectedUser?.id !== userInfo?.userId && (
                  <button
                    onClick={() => selectedUser && deleteContactFn(selectedUser.id)}
                    className="ml-auto rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10"
                    aria-label="Delete contact"
                  >
                    <FaRegTrashCan size={16} />
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:24px_24px] px-6 py-6">
                <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
                  {(conversationKey ? messages[conversationKey] : [])?.map(
                    (item, idx) => (
                      <div
                        className={clsx(
                          "flex w-max max-w-[80%] flex-col gap-1",
                          item?.senderUserId === currentUserId &&
                            "ml-auto items-end"
                        )}
                        key={`${item?.senderUserId ?? "unknown"}-${idx}`}
                      >
                        <div
                          className={clsx(
                            "rounded-2xl px-4 py-2 text-sm shadow",
                            item?.senderUserId === currentUserId
                              ? "rounded-br-md bg-[#005c4b] text-[#e9edef]"
                              : "rounded-bl-md border border-[#2a3942] bg-[#202c33] text-[#e9edef]"
                          )}
                        >
                          {item?.message}
                        </div>
                        <div className="text-[11px] text-[#8696a0]">
                          {moment(item?.createdAt).fromNow()}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!message?.trim()) return;
                  if (!selectedUser?.userId) return;

                  socket?.emit("private:message", {
                    message: message.trim(),
                    targetUserId: selectedUser.userId,
                  });
                  setMessage("");
                }}
                className="border-t border-[#2a3942] bg-[#202c33] px-6 py-4"
              >
                <div className="mx-auto flex w-full max-w-4xl items-center gap-2 rounded-xl border border-[#2a3942] bg-[#111b21] p-1">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="h-10 flex-1 bg-transparent px-3 text-sm text-[#e9edef] outline-none placeholder:text-[#8696a0]"
                    placeholder={
                      selectedUser?.userId
                        ? "Type your message..."
                        : "This contact is not on app yet"
                    }
                    disabled={!selectedUser?.userId}
                  />
                  <button
                    type="submit"
                    disabled={!selectedUser?.userId}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <LuSend size={18} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center px-6">
              <StatusPanel
                title="Select a conversation"
                description="Pick a contact from the sidebar to start chatting."
              >
                <Button
                  variant="ghost"
                  className="mt-5 h-10 rounded-xl border border-[#2a3942] px-4 text-[#e9edef] hover:bg-[#202c33] md:hidden"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <LuMenu size={16} className="mr-2" />
                  Open chats
                </Button>
              </StatusPanel>
            </div>
          )}
        </main>
      </div>

      <Modal
        isOpen={isAddGuestModalOpen}
        close={() => setIsAddGuestModalOpen(false)}
        className="space-y-6 p-5"
        size="sm"
      >
        <div className="text-center text-2xl font-medium text-[#e9edef]">
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
          className="h-11 !w-full"
          isLoading={isAddingContact}
          loadingText="Adding..."
          onClick={() => handleSubmit()}
        >
          Add Guest
        </Button>
      </Modal>
    </>
  );
}