import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";
import Link from "next/link";
import { fetchAllSIMD } from "@/utils/fetch-simd";
import dataTableStyles from "@/styles/core/dataTable.module.css";
// import styles from "@/styles/core/sidebar.module.css";
// import SIMDCard from "@/components/simd/SIMDCard";
import SIMDTableLineItem from "@/components/simd/SIMDTableLineItem";
import { computeSlugForSIMD } from "@/utils/helpers";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Solana Improvement Docs (SIMD)",
  description:
    "The Solana Improvement Documents (SIMD) describe proposed and accepted changes to the Solana protocol.",
};

export async function getStaticProps() {
  const records = await fetchAllSIMD();

  return {
    props: {
      records,
    },
    revalidate: 3600,
  };
}

type PageProps = {
  records: ParsedGitHubPullContent[];
};

export default function Page({ records }: PageProps) {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container space-y-8">
        <h1>Solana Improvement Docs</h1>

        <p className="max-w-4xl text-base text-gray-300 md:text-lg">
          This section hosts the Solana Improvement Documents (SIMD) assembled
          in{" "}
          <Link
            href={
              "https://github.com/solana-foundation/solana-improvement-documents"
            }
            className="underline"
          >
            this repository
          </Link>
          . The improvement documents describe proposed and accepted changes to
          the Solana protocol.The latest news and updates from the Solana
          Foundation.
        </p>
      </PageHero>

      <main
        className={`container-inner py-8 ${dataTableStyles.scrollContainer} hide-scroll-bar`}
      >
        <table className={`${dataTableStyles.dataTable} hide-scroll-bar`}>
          <thead>
            <tr>
              <th className={dataTableStyles.smallTh}>SIMD #</th>
              <th>Title</th>
              <th className={dataTableStyles.smallTh}>Type</th>
              <th className={dataTableStyles.smallTh}>Status</th>
              <th>Author</th>
              <th className={dataTableStyles.smallTh}>Created At</th>
              <th className={dataTableStyles.smallTh}></th>
            </tr>
          </thead>
          <tbody>
            {records
              .filter((item) => item.metadata.title && item.metadata.simd)
              .map((record, id) => (
                <SIMDTableLineItem
                  key={record.id}
                  href={`/simd/${computeSlugForSIMD(record)}`}
                  simd={record.metadata.simd}
                  title={record.metadata.title}
                  githubLink={record.html_url}
                  date={record.metadata.created}
                  type={record.metadata.type}
                  status={record.metadata.status}
                  authors={record.metadata.authors}
                />
              ))}
          </tbody>
        </table>
      </main>

      {/* <main className={styles.wrapper + " container"}>
        <SIMDCard
          id={0}
          href="/simd/000-lockout-violation-detection"
          githubLink="https://github.com/solana-foundation/solana-improvement-documents/pull/9"
          title="#000 Lockout Violation Detection"
          type="core"
          date="2022-12-12"
          status="draft"
          authors="carlin"
        />
      </main> */}
    </DefaultLayout>
  );
}
