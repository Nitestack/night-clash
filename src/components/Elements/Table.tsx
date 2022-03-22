import { forwardRef } from "react";

const Table = forwardRef<HTMLTableElement, { headings: Array<string>, rows: Array<Array<JSX.IntrinsicElements["td"]>> }>(({ headings, rows }, ref) => (
    <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-x-auto rounded-md border-2 border-solid border-lightmodetext dark:border-darkmodetext">
                    <table ref={ref} className="min-w-full">
                        <thead className="border-b">
                            <tr>
                                {headings.map((heading, index) => 
                                <th key={index} scope="col" className="text-sm font-medium text-lightmodetext dark:text-darkmodetext px-6 py-4 text-center">
                                    {heading}
                                </th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((rowElement, trIndex) => 
                            <tr key={trIndex} className="border-b bg-lightmodeprimary dark:bg-darkmodeprimary even:bg-lightmodesecondary dark:even:bg-darkmodesecondary">
                                {rowElement.map((tdElement, tdIndex) => 
                                <>{tdElement}</>)}
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
));

export default Table;