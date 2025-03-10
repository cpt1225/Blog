'use client'
import { useState, useCallback, useEffect } from "react";
import { Tooltip } from "@heroui/tooltip";
import { User } from "@heroui/user";
import request from "@/lib/axios"
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import { User as Userteam } from "@/types"
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/modal";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table"
import { dateChange } from "@/utils/date";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "CREATED", uid: "time" },
  { name: "ACTIONS", uid: "actions" },
];



const Page = () => {
  const [name, setName] = useState("")
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [users, setUsers] = useState<Userteam[]>([])
  const [action, setAction] = useState<() => () => void>(() => () => () => { })

  const fetchUsers = useCallback(async () => {
    try {
      const res = await request({
        url: '/user',
        method: 'GET'
      })
      if (res.data.status === 200) {
        setUsers(res.data.data)
      } else {
        toast.error(res.data.message)
        return []
      }
    } catch {
      toast.error('系统错误')
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])
  const boostUser = useCallback(async (id: number) => {
    try {
      const res = await request({
        url: '/user',
        method: 'PUT',
        data: {
          id,
          action: 'up'
        }
      })
      if (res.data.status === 200) {
        toast.success(res.data.message)
        await fetchUsers()
      } else {
        toast.error(res.data.message)
      }
    } catch {
      toast.error('系统错误')
    }
  }, [fetchUsers])

  const downUser = useCallback(async (id: number) => {
    try {
      const res = await request({
        url: '/user',
        method: 'PUT',
        data: {
          id,
          action: 'down'
        }
      })
      if (res.data.status === 200) {
        toast.success(res.data.message)
        await fetchUsers()
      } else {
        toast.error(res.data.message)
      }

    } catch {
      toast.error('系统错误')
    }
  }, [fetchUsers])


  const renderCell = useCallback((user: Userteam, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg" }}
            description={user.email}
            name={user.username}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm ">{user.role}</p>
          </div>
        );
      case "time":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{dateChange(user.createTime)}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="提高权限">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <button onClick={() => {
                  setName(user.username)
                  setAction(() => () => boostUser(user.id))
                  onOpen()
                }}> <ArrowBigUp /></button>
              </span>
            </Tooltip>
            <Tooltip content="降低权限">
              <span className="text-lg  text-default-400 cursor-pointer active:opacity-50">
                <button onClick={() => {
                  setName(user.username)
                  setAction(() => () => downUser(user.id))
                  onOpen()
                }}><ArrowBigDown /></button>
              </span>
            </Tooltip>
          </div>
        );
    }
  }, [onOpen, boostUser, downUser]);

  return (
    <>
      <ToastContainer
        closeOnClick={true}
        position="top-center"
        autoClose={3000} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="flex items-center">
          {(onClose) => (
            <>
              <ModalBody className="mt-8 text-sm flex justify-center items-center font-bold">操作该用户{name}?</ModalBody>
              <ModalFooter>
                <button className="bg-black text-white rounded-lg p-1 text-sm hover:bg-white hover:text-black" onClick={onClose}>
                  取消
                </button>
                <button  className="bg-black text-white rounded-lg p-1 text-sm hover:bg-white hover:text-black" onClick={() => {
                  action();
                  onClose();
                }}>
                  确定
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default Page
