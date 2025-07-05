"use client"

export function MinimalProfileCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 sticky top-8 rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-6">
        <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <div className="h-16 w-16 text-white text-4xl">👨‍💻</div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thaung Htike Oo</h3>
        <p className="text-blue-600 font-semibold mb-2">Senior DevOps Engineer</p>
        <div className="flex items-center justify-center text-gray-600 mb-2">
          <span className="text-blue-500 mr-2">📧</span>
          <a
            href="mailto:thaunghtikeoo.tho1234@gmail.com"
            className="hover:underline font-medium"
          >
            thaunghtikeoo.tho1234@gmail.com
          </a>
        </div>
        <div className="flex items-center justify-center text-gray-600">
          <span className="text-blue-500 mr-2">📍</span>
          <span className="font-medium">Yangon, Myanmar</span>
        </div>
      </div>
      <p className="text-gray-600 font-light text-sm mb-8 leading-relaxed">
        <strong className="text-gray-800">DevOps Engineer</strong> with 5+ years of
        experience building and automating cloud-native and on-prem infrastructure.
        Skilled in CI/CD pipelines, Kubernetes, Docker, Terraform, and Ansible.
        Experienced with Azure and AWS, focused on scalability. Exploring MLOps to
        streamline ML workflows and deployment.
      </p>
      <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold">
        📥 Download CV
      </button>
    </div>
  )
}