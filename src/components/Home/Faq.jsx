/* eslint-disable react/no-unescaped-entities */

const Faq = () => {
    return (
        <section className="dark:bg-base-200 dark:text-white-800 my-5">
            <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                <h2 className="text-2xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
                <p className="mt-4 mb-8 dark:text-blue">Some common questions and answers</p>
                <div className="space-y-4">
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How can I join a study group on the platform?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">To join a study group, simply sign up for an account on our platform and explore the available study groups. You can request to join a group, or if you have friends already on the platform, they can invite you to their group. Once you are a member, you can collaborate with your friends on assignments and share resources. </p>
                    </details>
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">Can I create my own study group?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Absolutely! As a registered user, you have the option to create your own study group. Simply navigate to the "Create Group" section, fill out the necessary details such as the group name, description, and any specific requirements, and invite your friends to join. You'll then be able to collaborate with your group members on assignments and discussions. </p>
                    </details>
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600"> How are assignments graded in the study groups?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Assignments within study groups are typically graded by peers. After completing an assignment, you can submit it to your group for review. Your group members will then provide feedback and assign a grade based on predefined criteria. This peer grading system fosters collaboration, encourages constructive feedback, and helps improve overall learning outcomes.</p>
                    </details>
                </div>
            </div>
        </section>
    );
};

export default Faq;