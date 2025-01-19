import { NextRequest, NextResponse } from 'next/server';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getProfileUrn(profileUrl: string) {
  try {
    const response = await fetch(profileUrl, {
      headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "csrf-token": "ajax:7215518241635508373",
        "priority": "u=1, i",
        "sec-ch-prefers-color-scheme": "dark",
        "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-li-lang": "en_US",
        "x-restli-protocol-version": "2.0.0",
        "cookie": "_gcl_au=1.1.1671705125.1734775528; bcookie=\"v=2&f7ae6bae-ab62-44e4-8f60-a26b92091c9d\"; bscookie=\"v=1&2024122110052781ad9437-61f1-4140-8189-3446a77c1705AQGmQJt_M66yp52_U4EcX2JbJKKWzRLp\"; aam_uuid=33073172410752227441770426933824670823; li_rm=AQFzuN8oyvM4UwAAAZPor5zJLoGyCjPSHvJQrrXOlD00gkxzXJtEXdfBw75FVysHLwufC69UKquIAPpoKtlNlBew-dJITfp7lmaab4raOzPeoqkv-tyLLs2N; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C20079%7CMCMID%7C32546563925036715711756121100730089388%7CMCAAMLH-1735399711%7C12%7CMCAAMB-1735399711%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1734802111s%7CNONE%7CvVersion%7C5.1.1; li_gc=MTswOzE3MzQ3OTU2NjU7MjswMjEgxeYP8JxEjluP3IjPs87IR0XPejx5Omc0djLsK0OnUA==; li_alerts=e30=; li_sugr=ee65df4d-df18-4c03-9e37-fdf8020a5b1b; lang=v=2&lang=en-us; fid=AQGtn3mULwt_dwAAAZP3LpaUj2su8y9a2lTmHLAp8WP1Eh6e8aIej8tCIx8mi6igtQ4H-nSVpvi2dA; li_at=AQEDASaBUNUEvEEfAAABk_dqv5gAAAGUG3dDmE0ALiFnNXmS9LNpOtk0nqZyCkSM6vKnxJahUGa7cChadX7WTONMfe4q-YGM4oX4vs-TLxil7zzP6t2bX9JXKATkaJIp8Iqq6rLQnRSTH7HEdJLfVG10; liap=true; JSESSIONID=\"ajax:7215518241635508373\"; timezone=Asia/Calcutta; li_theme=light; li_theme_set=app; AnalyticsSyncHistory=AQJD9kbfn8Ki7QAAAZP3awg39rNprEE6Wt-uZXNj9W-X3gUmvJLqeeC8ESB5OMriqhtKAAnev0BVkdp0Ee99vg; _guid=d9d1554d-8ea6-4ce7-864c-03931900c9a0; dfpfpt=3f80f8511a494bfbad0e9e0ecc9fa3dc; fptctx2=taBcrIH61PuCVH7eNCyH0CYjjbqLuI8XF8pleSQW5NZSD9LAc%252fyPA3c%252fOx6kLlCu1IrGPq3hvwmq2Dw20YjRCmQK1D2dbtHDkbbyh7WPH4xh06jzMxE0QHYeWKdWer140ALopfa4kw5PLJVoXg86vNC%252fqm9ZdKu3ZZGjNfm7b2FJsOJUFmaMZPUK1JV2RFUev8QFDiCuR1bZxEoyuonZeVzAH3ZI6dmNr457fas%252b%252fcN1To4AV4b7LolKtaAh4bZiRAcUbi%252fuTksvpVQd7ZEOCDz%252fJyUwL4aOT%252fqeXJ8eUwsFFW2O2Ae1mG52qLzeeL28LHzd07I4jH1jvOkuT04sWrge1TN1hdXbLWRpXOS6ukk%253d; UserMatchHistory=AQI-DjM6T0epzAAAAZP3a3ulnej2AO8JdZ0qc5CWKPb8dM2YewWSHHMRw_kFsIsknF3JNCQUE-WQAg; lms_ads=AQFF-kwftvB1GAAAAZP3a4FpVkA9pt78xaHPlux_WvXAfn-XjJOGhAmExwv2q2t3kXMlD7zTsxOKFpkLIrhH3Pysm4KyUzvg; lms_analytics=AQFF-kwftvB1GAAAAZP3a4FpVkA9pt78xaHPlux_WvXAfn-XjJOGhAmExwv2q2t3kXMlD7zTsxOKFpkLIrhH3Pysm4KyUzvg; lidc=\"b=OB45:s=O:r=O:a=O:p=O:g=5467:u=14:x=1:i=1735023270:t=1735109189:v=2:sig=AQGN9eMQS8Oz4RaFGcpzqX3IIZKXZE7s\"",
        "Referer": profileUrl,
        "Referrer-Policy": "strict-origin-when-cross-origin"
      }
    });

    const html = await response.text();

    // Extract the profileUrn using regex
    const urnMatch = html.match(/urn:li:fsd_profileCard:\(([^,]+),EXPERIENCE,en_US\)/);

    if (!urnMatch) {
      throw new Error('Could not find profile URN');
    }

    // Extract the ID from capture group 1 and construct the final URN
    const profileId = urnMatch[1];
    const finalProfileUrn = `urn:li:fsd_profile:${profileId}`;

    return finalProfileUrn;
  } catch (error) {
    throw new Error('Failed to fetch profile URN');
  }
}

export async function POST(request: NextRequest) {

  const { profileUrl } = await request.json();

  const myHeaders = {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "csrf-token": "ajax:7215518241635508373",
    "priority": "u=1, i",
    "sec-ch-prefers-color-scheme": "dark",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-li-lang": "en_US",
    "x-restli-protocol-version": "2.0.0",
    "cookie": "_gcl_au=1.1.1671705125.1734775528; bcookie=\"v=2&f7ae6bae-ab62-44e4-8f60-a26b92091c9d\"; bscookie=\"v=1&2024122110052781ad9437-61f1-4140-8189-3446a77c1705AQGmQJt_M66yp52_U4EcX2JbJKKWzRLp\"; aam_uuid=33073172410752227441770426933824670823; li_rm=AQFzuN8oyvM4UwAAAZPor5zJLoGyCjPSHvJQrrXOlD00gkxzXJtEXdfBw75FVysHLwufC69UKquIAPpoKtlNlBew-dJITfp7lmaab4raOzPeoqkv-tyLLs2N; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C20079%7CMCMID%7C32546563925036715711756121100730089388%7CMCAAMLH-1735399711%7C12%7CMCAAMB-1735399711%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1734802111s%7CNONE%7CvVersion%7C5.1.1; li_gc=MTswOzE3MzQ3OTU2NjU7MjswMjEgxeYP8JxEjluP3IjPs87IR0XPejx5Omc0djLsK0OnUA==; li_alerts=e30=; li_sugr=ee65df4d-df18-4c03-9e37-fdf8020a5b1b; lang=v=2&lang=en-us; fid=AQGtn3mULwt_dwAAAZP3LpaUj2su8y9a2lTmHLAp8WP1Eh6e8aIej8tCIx8mi6igtQ4H-nSVpvi2dA; li_at=AQEDASaBUNUEvEEfAAABk_dqv5gAAAGUG3dDmE0ALiFnNXmS9LNpOtk0nqZyCkSM6vKnxJahUGa7cChadX7WTONMfe4q-YGM4oX4vs-TLxil7zzP6t2bX9JXKATkaJIp8Iqq6rLQnRSTH7HEdJLfVG10; liap=true; JSESSIONID=\"ajax:7215518241635508373\"; timezone=Asia/Calcutta; li_theme=light; li_theme_set=app; AnalyticsSyncHistory=AQJD9kbfn8Ki7QAAAZP3awg39rNprEE6Wt-uZXNj9W-X3gUmvJLqeeC8ESB5OMriqhtKAAnev0BVkdp0Ee99vg; _guid=d9d1554d-8ea6-4ce7-864c-03931900c9a0; dfpfpt=3f80f8511a494bfbad0e9e0ecc9fa3dc; fptctx2=taBcrIH61PuCVH7eNCyH0CYjjbqLuI8XF8pleSQW5NZSD9LAc%252fyPA3c%252fOx6kLlCu1IrGPq3hvwmq2Dw20YjRCmQK1D2dbtHDkbbyh7WPH4xh06jzMxE0QHYeWKdWer140ALopfa4kw5PLJVoXg86vNC%252fqm9ZdKu3ZZGjNfm7b2FJsOJUFmaMZPUK1JV2RFUev8QFDiCuR1bZxEoyuonZeVzAH3ZI6dmNr457fas%252b%252fcN1To4AV4b7LolKtaAh4bZiRAcUbi%252fuTksvpVQd7ZEOCDz%252fJyUwL4aOT%252fqeXJ8eUwsFFW2O2Ae1mG52qLzeeL28LHzd07I4jH1jvOkuT04sWrge1TN1hdXbLWRpXOS6ukk%253d; UserMatchHistory=AQI-DjM6T0epzAAAAZP3a3ulnej2AO8JdZ0qc5CWKPb8dM2YewWSHHMRw_kFsIsknF3JNCQUE-WQAg; lms_ads=AQFF-kwftvB1GAAAAZP3a4FpVkA9pt78xaHPlux_WvXAfn-XjJOGhAmExwv2q2t3kXMlD7zTsxOKFpkLIrhH3Pysm4KyUzvg; lms_analytics=AQFF-kwftvB1GAAAAZP3a4FpVkA9pt78xaHPlux_WvXAfn-XjJOGhAmExwv2q2t3kXMlD7zTsxOKFpkLIrhH3Pysm4KyUzvg; lidc=\"b=OB45:s=O:r=O:a=O:p=O:g=5467:u=14:x=1:i=1735023270:t=1735109189:v=2:sig=AQGN9eMQS8Oz4RaFGcpzqX3IIZKXZE7s\"",
    "Referer": profileUrl,
    "Referrer-Policy": "strict-origin-when-cross-origin"
  }

  try {

    const profileUrnId = await getProfileUrn(profileUrl);

    if (profileUrnId) {
      const encodedProfileUrn = encodeURIComponent(profileUrnId);
      const count = 100;
      let start = 0;
      let allPosts: any = {
        metadata: {},
        elements: [],
        paging: {}
      }
      let paginationToken: string = ''; // Initially empty

      // const url = `https://www.linkedin.com/voyager/api/identity/profileUpdatesV2?count=${count}&includeLongTermHistory=true&moduleKey=creator_profile_all_content_view%3Adesktop&numComments=0&profileUrn=${encodedProfileUrn}&q=memberShareFeed&start=${start}`;

      // // You'll need to handle authentication headers
      // const response = await fetch(url, {
      //   headers: myHeaders,
      //   "method": "GET"
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to fetch LinkedIn posts');
      // }

      // const data = await response.json();
      // return NextResponse.json(data);

      // Loop until we have less than 100 elements
      while (true) {
        const url = `https://www.linkedin.com/voyager/api/identity/profileUpdatesV2?count=${count}&includeLongTermHistory=true&moduleKey=creator_profile_all_content_view%3Adesktop&numComments=0&profileUrn=${encodedProfileUrn}&q=memberShareFeed&start=${start}${paginationToken ? `&paginationToken=${paginationToken}` : ''}`;

        // You'll need to handle authentication headers
        const response = await fetch(url, {
          headers: myHeaders,
          method: "GET",
        });

        if (!response.ok) {
          throw new Error('Failed to fetch LinkedIn posts');
        }

        const data = await response.json();

        // Accumulate the posts
        if (data.elements.length > 100) {
          allPosts = data
        }
        else {
          allPosts.elements = [...allPosts.elements, ...data.elements];
          allPosts.paging = data.paging;
          allPosts.metadata = data.metadata;
        }

        // If the length of elements is less than 100, stop fetching
        if (data.elements.length < 100) {
          break;
        }

        // Otherwise, continue with the next page
        paginationToken = data.metadata.paginationToken; // Get the new paginationToken
        start += count; // Update the 'start' value for the next request

        // Wait for a random delay between 10 and 12 seconds
        const randomDelay = Math.floor(Math.random() * (12000 - 10000 + 1)) + 10000;
        await delay(randomDelay); // Add delay
      }

      return NextResponse.json(allPosts);
    }
    else {
      return NextResponse.json({ error: "Profile urn failed to fetched" });
    }

  } catch (error) {
    return NextResponse.json({
      error: `Failed to fetch posts ${error}`,
    }, { status: 500 });
  }
}