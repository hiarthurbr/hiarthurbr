/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  amp: {
    canonicalBase: "https://arthurbr.me",
  },
  compress: true,
  crossOrigin: "anonymous",
  transpilePackages: ["geist"],
  // generateBuildId: async () => {
  //   const { sha, commit } = await axios.get('https://api.github.com/repos/Ar7hurz1nh0/Ar7hurz1nh0/commits').then(d => d.data)
  //   const buildId = {
  //     githubCommitSha: sha,
  //     author: commit.author
  //   }
  //   return sha
  // }
};

export default config;
