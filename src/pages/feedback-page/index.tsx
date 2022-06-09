import { Steps } from "antd"
import { useState } from "react"
const { Step } = Steps
export default function FeedbackPage() {
	const [currentStep, setCurrentSteep] = useState(1)
	return (
		<div style={{ padding: "20px" }}>
			<Steps current={currentStep}>
				<Step title="Finished" description="This is a description." />
				<Step
					title="In Progress"
					subTitle="Left 00:00:08"
					description="This is a description."
				/>
				<Step title="Waiting" description="This is a description." />
			</Steps>
			{currentStep === 1 ? (
				<div>11111111111111111111</div>
			) : (
				<div>222222222222222</div>
			)}
		</div>
	)
}
