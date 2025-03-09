'use client'
import { useState, useCallback, useEffect } from "react";
import { Tooltip } from "@heroui/tooltip";
import request from "@/lib/axios"
import { Eye, Trash2, FilePenLine } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Post } from "@/types";
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



export const columns = [
  { name: "AUTHOR", uid: "author" },
  { name: "TITLE", uid: "title" },
  { name: "CREATED", uid: "time" },
  { name: "ACTIONS", uid: "actions" },
];

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState("")
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [posts, setPosts] = useState<Post[]>([])
  const [action, setAction] = useState<() => () => void>(() => () => () => { })

  const fetchPosts = useCallback(async () => {
    try {
      const res = await request({
        url: '/post',
        method: 'GET'
      })
      if (res.data.status === 200) {
        setPosts(res.data.data)
      } else {
        toast.error(res.data.message)
      }
    } catch {
      toast.error('系统错误')
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const deletePost = useCallback(async (id: number) => {
    try {
      const res = await request({
        url: `/post/${id}`,
        method: 'DELETE'
      })
      if (res.data.status === 200) {
        toast.success(res.data.message)
        await fetchPosts()
      } else {
        toast.error(res.data.message)
      }
    } catch {
      toast.error('系统错误')
    }
  },[fetchPosts])

  const renderCell = useCallback((post: Post, columnKey: React.Key) => {
    switch (columnKey) {
      case "author":
        return (
        <span className="text-sm">{post.author?.username}</span>
        );
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm ">{post.title}</p>
          </div>
        );
      case "time":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{dateChange(post.createTime)}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="查看">
              <span className="text-lg  cursor-pointer active:opacity-50">
                <button onClick={() => {
                 setName('确定查看该博客')
                 setAction(() => () => router.push(`/post/${post.id}`))
                 onOpen()
                }}> <Eye /></button>
              </span>
            </Tooltip>
            <div className="relative flex items-center gap-2">
              <Tooltip content="修改">
                <span className="text-lg cursor-pointer active:opacity-50">
                  <button onClick={() => {
                   setName('确定修改该博客')
                   setAction(() => () => router.push(`/admin/revise/${post.id}`))
                   onOpen()
                  }}><FilePenLine /></button>
                </span>
              </Tooltip>
              <Tooltip content="删除">
                <span className="text-lg  cursor-pointer active:opacity-50">
                  <button onClick={() => {
                   setName('确定删除该博客')
                   setAction(() => () => deletePost(post.id))
                   onOpen()
                  }}><Trash2/></button>
                </span>
              </Tooltip>
            </div>
            </div>
            );
    }
  }, [onOpen,router,deletePost]);

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
              <ModalBody className="mt-8 text-sm flex justify-center items-center font-bold">{name}</ModalBody>
              <ModalFooter>
                <button className="bg-black text-white rounded-lg p-1 text-sm hover:bg-white hover:text-black" onClick={onClose}>
                  取消
                </button>
                <button className="bg-black text-white rounded-lg p-1 text-sm hover:bg-white hover:text-black" onClick={() => {
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
        <TableBody items={posts}>
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

export default Page;
