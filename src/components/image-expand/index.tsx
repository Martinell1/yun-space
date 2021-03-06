import { Button, Input, message, Popconfirm } from "antd"
import { imageProps } from "../../store"
import {
	MediumOutlined,
	CopyOutlined,
	DeleteOutlined,
	QuestionCircleOutlined,
} from "@ant-design/icons"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { managementActions } from "../../store/management.slice"

interface imageExpandProps extends imageProps {
	deleteFn: () => void
}

const ImageExpand = (props: imageExpandProps) => {
	const [isMarkDown, SetIsMarkDown] = useState(false)
	const dispatch = useDispatch()
	const clipboardObj = navigator.clipboard
	return (
		<div style={{ padding: "5px 0 11px 0" }}>
			<Input
				bordered={false}
				defaultValue={props.name}
				onBlur={(e) => {
					dispatch(
						managementActions.renameImage({
							dir: props.dir,
							imageId: props.id,
							imageName: e.target.value,
						})
					)
					message.success("修改成昆")
				}}
			></Input>
			<div
				style={{
					padding: "4px 11px 0 11px",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<div>
					<Button
						type={isMarkDown ? "primary" : "default"}
						size="small"
						icon={<MediumOutlined />}
						onClick={() => {
							SetIsMarkDown(!isMarkDown)
						}}
					/>
					<Button
						size="small"
						icon={<CopyOutlined />}
						onClick={() => {
							if (isMarkDown) {
								clipboardObj.writeText(`![${props.name}](${props.url})`)
							} else {
								clipboardObj.writeText(props.url)
							}

							message.success(`已拷贝${isMarkDown ? "Markdown" : ""}链接`)
						}}
					/>
				</div>
				<Popconfirm
					title="确认删除?"
					icon={<QuestionCircleOutlined style={{ color: "red" }} />}
					onConfirm={() => {
						props.deleteFn()
					}}
				>
					<Button size="small" icon={<DeleteOutlined />} />
				</Popconfirm>
			</div>
		</div>
	)
}

export default ImageExpand
