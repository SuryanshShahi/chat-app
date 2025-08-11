import { useMutation, useQuery } from "@tanstack/react-query";
import { addContact, deleteContact, getContacts } from "../../apis/apis";
import { IAddContact, IContact } from "../../apis/types";
import { useFormik } from "formik";
import useSharedVariables from "../../utils/hooks/useSharedVariables";
import { useContext, useEffect, useState } from "react";
import AppContext, { GlobalContext } from "@/app/context";
// import useSocket from "@/app/utils/hooks/useSocket";
const useHook = () => {
  const { socket } = useContext(AppContext);
  const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    status?: string;
  } | null>(null);
  const { userInfo } = useSharedVariables();
  const { data: contacts, refetch } = useQuery<{ results: IContact[] }>({
    queryKey: ["contacts"],
    queryFn: getContacts,
    enabled: !!userInfo?.userId,
  });
  const { mutate: addContactFn, isPending: isAddingContact } = useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      refetch();
      setIsAddGuestModalOpen(false);
      alert("Contact added successfully");
    },
    onError: () => {
      alert("Failed to add contact");
    },
  });
  const formProps = useFormik<IAddContact>({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },
    onSubmit: (values) => {
      addContactFn(values);
    },
  });
  const { mutate: deleteContactFn, isPending: isDeletingContact } = useMutation(
    {
      mutationFn: deleteContact,
      onSuccess: () => {
        refetch();
        setSelectedUser(null);
      },
      onError: () => {
        alert("Failed to delete contact");
      },
    }
  );
  useEffect(() => {
    if (!selectedUser) return;
    socket?.emit("check-online", selectedUser?.id, (isOnline: boolean) => {
      setIsOnline(isOnline);
    });
  }, [selectedUser]);
  return {
    contacts: [
      {
        id: userInfo?.userId ?? "",
        name: userInfo?.name || userInfo?.phone || "asd",
        phone: userInfo?.phone,
      },
      ...(contacts?.results || []),
    ],
    addContactFn,
    isAddingContact,
    isAddGuestModalOpen,
    setIsAddGuestModalOpen,
    ...formProps,
    userInfo,
    deleteContactFn,
    isDeletingContact,
    selectedUser,
    setSelectedUser,
    isOnline,
  };
};

export default useHook;
