import { useEffect, useState } from "react"
import { Button, Card, Image, Input, message, Modal, Popconfirm } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import SelectDir from "../../components/select-dir"
import "./index.css"
import ImageExpand from "../../components/image-expand"
import { useDispatch, useSelector } from "react-redux"
import {
	managementActions,
	selectManagement,
} from "../../store/management.slice"
import { configActions, selectConfig } from "../../store/config.slice"

export default function ManagePage() {
	const config = useSelector(selectConfig)
	const management = useSelector(selectManagement)
	const dispatch = useDispatch()
	const [currentDir, setCurrentDir] = useState(config.dir)
	const [newDirName, setNewDirName] = useState(config.dir)
	const [isModalVisible, setIsModalVisible] = useState(false)

	useEffect(() => {
		setCurrentDir(config.dir)
	}, [config.dir])

	useEffect(() => {
		setNewDirName(currentDir)
	}, [currentDir])

	return (
		<div style={{ padding: "20px 0" }}>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<SelectDir
					currentDir={currentDir}
					setCurrentDir={setCurrentDir}
					children={
						<Button style={{ marginBottom: "20px" }}>{currentDir}</Button>
					}
				></SelectDir>
				<div>
					<Button
						style={{ marginRight: "20px" }}
						type="primary"
						onClick={() => {
							if (currentDir === "default") {
								message.error("默认目录不可修改")
								return
							}
							setIsModalVisible(!isModalVisible)
						}}
					>
						重命名
					</Button>
					<Modal
						title="重命名当前目录"
						cancelText="取消"
						okText="确认"
						visible={isModalVisible}
						onOk={() => {
							for (let i = 0; i < management.length; i++) {
								if (management[i].dir === newDirName) {
									console.log("执行")
									message.error("该目录已存在")
									return
								}
							}
							dispatch(
								managementActions.renameManagement({
									oldName: config.dir,
									newName: newDirName,
								})
							)
							dispatch(configActions.setConfig({ ...config, dir: newDirName }))
							setIsModalVisible(false)
							window.location.reload()
						}}
						onCancel={() => {
							setIsModalVisible(false)
						}}
					>
						<Input
							defaultValue={currentDir}
							placeholder="请输入新目录名"
							onChange={(e) => {
								setNewDirName(e.target.value)
							}}
						/>
					</Modal>
					<Popconfirm
						title="确认删除?"
						icon={<QuestionCircleOutlined style={{ color: "red" }} />}
						onConfirm={() => {
							if (currentDir === "default") {
								message.error("无法删除默认目录")
								return
							}
							const newManagement = management.filter((item) => {
								return item.dir !== currentDir
							})
							dispatch(configActions.setConfig({ ...config, dir: "default" }))
							setCurrentDir("dedfault")
							dispatch(managementActions.setManagement(newManagement))
							message.success("删除成昆")
						}}
						placement="bottomRight"
					>
						<Button danger>删除</Button>
					</Popconfirm>
				</div>
			</div>
			{management.map((dir, index) => {
				return (
					<div
						key={index}
						style={{
							display: "flex",
							flexWrap: "wrap",
						}}
					>
						{dir.dir === currentDir
							? dir.imageList.map((image) => {
									return (
										<Card
											key={image.name}
											hoverable
											style={{ margin: "0 20px 20px 0" }}
											bodyStyle={{
												padding: 0,
											}}
											cover={
												<Image
													style={{ objectFit: "cover" }}
													src={image.url}
													width={200}
													height={140}
												/>
											}
										>
											<ImageExpand
												id={image.id}
												dir={image.dir}
												name={image.name}
												url={image.url}
												deleteFn={() => {
													dispatch(
														managementActions.deleteImage({
															dir: image.dir,
															imageId: image.id,
														})
													)
													message.success("删除成功")
												}}
											/>
										</Card>
									)
							  })
							: null}
					</div>
				)
			})}
		</div>
	)
}
