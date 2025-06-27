import React from 'react';

export const PaginationTable = ({ userData, setSkip, skip,limit,total }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selected, setSelected] = React.useState("id");
    const pageSize = 10;
  console.log("limit",limit, "skip", skip, "total", total);
    // Filtered data
    const filteredData = React.useMemo(() => {
        if (!searchTerm) return userData;
        const term = searchTerm.toLowerCase();
        return userData.filter(user => {
            if (selected === "id") {
                return user.id?.toString().includes(term);
            } else if (selected === "name") {
                const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim().toLowerCase();
                return fullName.includes(term);
            }
            return false;
        });
    }, [userData, searchTerm, selected]);

    // Reset to first page when filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selected, userData]);

    const pageCount = Math.ceil((filteredData.length || 0) / pageSize);

    // Paginated data
    const paginatedData = React.useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, currentPage]);

    // Pagination buttons logic
    const getPageButtons = () => {
        if (pageCount <= 5) return Array.from({ length: pageCount }, (_, i) => (skip/10) +i  + 1);
        if (currentPage <= 3) return [1, 2, 3, 4, '...', pageCount];
        if (currentPage >= pageCount - 2) return [1, '...', pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageCount];
    };
    const pageButtons = getPageButtons();

    const handlePagination = (page) => {
        if (page === '...') return;
        setCurrentPage(page);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', background: '#f5f6fa', borderRadius: '8px', marginBottom: '16px', gap: '8px' }}>
                <select style={{ padding: "0.7rem", borderRadius: "6px", border: '1px solid #ccc', fontSize: "1rem" }} onChange={(e) => setSelected(e.target.value)} value={selected}>
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                </select>
                <input
                    type="text"
                    placeholder="Search..."
                    style={{ marginLeft: '8px', padding: "0.7rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem" }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
            </div>

            <div style={{ maxHeight: '350px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ position: 'sticky', top: 0, background: '#f5f6fa', zIndex: 1 }}>
                        <tr>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', background: '#f5f6fa', position: 'sticky', top: 0 }}>ID</th>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', background: '#f5f6fa', position: 'sticky', top: 0 }}>Name</th>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', background: '#f5f6fa', position: 'sticky', top: 0 }}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData && paginatedData.length > 0 ? (
                            paginatedData.map((user) => (
                                <tr key={user.id}>
                                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: "center" }}>{user.id ?? '-'}</td>
                                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: "center" }}>
                                        {user.firstName || user.lastName
                                            ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
                                            : user.name || '-'}
                                    </td>
                                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: "center" }}>{user.email ?? '-'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} style={{ textAlign: 'center', padding: '16px', color: '#888' }}>
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
               
                    <div style={{ padding: '8px', textAlign: 'center', color: '#888' }}>
                        <button style={{ margin: '0 4px', padding: '6px 12px', borderRadius: '4px', border: '1px solid #ddd', background: '#f5f6fa', cursor: 'pointer'}} 
      onClick={() => {
        if (skip - limit >= 0) {
          setSkip((skip ) => skip - limit);
        }
      }} >prev</button>
                     { (pageCount > 1) && pageButtons.map((button, idx) => {
                            if (button === '...') {
                                return <span key={`ellipsis-${idx}`} style={{ margin: '0 6px' }}>...</span>;
                            }                        
                            return (
                                <button
                                    key={`page-${idx+1}`}
                                    style={{
                                        margin: '0 4px',
                                        padding: '6px 12px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        background: '#f5f6fa',
                                        cursor: 'pointer',
                                        color: currentPage === idx+1 ? '#1976d2' : '#555',
                                        fontWeight: currentPage === idx+1 ? 'bold' : 'normal',
                                    }}
                                    onClick={() => handlePagination(idx+1)}
                                    disabled={currentPage === idx+1}
                                >
                                    {button}
                                </button>
                            );
                        })}
                        <button style={{ margin: '0 4px', padding: '6px 12px', borderRadius: '4px', border: '1px solid #ddd', background: '#f5f6fa' , cursor: 'pointer'}}  onClick={() => { if(total > skip && ((skip+50) < total)) { setSkip((skip) => skip + 50);} }}>Next</button>                                   
                        <span style={{ padding : '6px 12px' }}>total : {total}</span>
                    </div>
            </div>
        </>
    );
};
 