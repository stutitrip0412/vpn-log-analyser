const PageContainer = ({ children }) => {

    return (

        <div
            className="
                w-full
                max-w-[1700px]
                mx-auto
                px-6
                lg:px-8
                xl:px-10
                py-12
                
            "
        >
            {children}
        </div>

    );

};

export default PageContainer;