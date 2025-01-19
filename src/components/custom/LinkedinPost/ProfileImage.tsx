import Image from "next/image";

const ProfileImage = ({ data }: any) => {

  // Destructure for easier access to nested data
  const actorImage = data?.actor?.image?.attributes;
  const miniProfile = actorImage?.[0]?.miniProfile;
  const miniCompany = actorImage?.[0]?.miniCompany;

  // Construct the profile image URL
  const profileImageUrl = miniProfile
    ? `${miniProfile?.picture?.["com.linkedin.common.VectorImage"]?.rootUrl}${miniProfile?.picture?.["com.linkedin.common.VectorImage"]?.artifacts?.[0]?.fileIdentifyingUrlPathSegment}`
    : null;

  // Construct the company logo URL
  const companyLogoUrl = miniCompany
    ? `${miniCompany?.logo?.["com.linkedin.common.VectorImage"]?.rootUrl}${miniCompany?.logo?.["com.linkedin.common.VectorImage"]?.artifacts?.[0]?.fileIdentifyingUrlPathSegment}`
    : null;

  // Check if the URL is valid before rendering the image
  const validProfileImageUrl = profileImageUrl && profileImageUrl !== "undefinedundefined";
  const validCompanyLogoUrl = companyLogoUrl && companyLogoUrl !== "undefinedundefined";

  return (
    <div className="shrink-0">
      {validProfileImageUrl ? (
        // Render Profile Image if valid URL is available
        <Image
          width={200}
          height={200}
          className="w-12 h-12 rounded-full ring-4 ring-gray-300 shadow-sm"
          src={profileImageUrl}
          alt="user-avatar-image"
        />
      ) : validCompanyLogoUrl ? (
        // Render Company Logo if Profile Image is not available and valid URL is available
        <Image
          width={200}
          height={200}
          className="w-12 h-12 rounded-full ring-4 ring-gray-300 shadow-sm"
          src={companyLogoUrl}
          alt="company-logo-image"
        />
      ) : (
        // If neither image URL is valid, render a fallback (e.g., a placeholder)
        <div className="w-12 h-12 rounded-full ring-4 ring-gray-300 shadow-sm bg-gray-200 flex items-center justify-center">
          <span className="text-sm text-gray-500">No Image</span>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
