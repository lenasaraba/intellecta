using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITP_Intellecta.Services
{
    public class CourseMaterialService : ICourseMaterialService
    {
         private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CourseMaterialService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<GetCourseMaterialDto>> AddCourseMaterial(AddCourseMaterialDto newCourseMaterial)
        {
            var serviceResponse = new ServiceResponse<GetCourseMaterialDto>();
            var courseMaterial=_mapper.Map<CourseContent>(newCourseMaterial);

            _context.Materials.Add(courseMaterial);
            await _context.SaveChangesAsync();

            serviceResponse.Data =(
                await _context.Materials
                    .Where(c => c.ContentId==courseMaterial.ContentId)
                    .Select(c => _mapper.Map<GetCourseMaterialDto>(c))
                    .ToListAsync()).FirstOrDefault();

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCourseMaterialDto>>> GetMaterialById(int id)
        {
            var serviceResponse = new ServiceResponse<List<GetCourseMaterialDto>>();
            var materials = await _context.Materials
                .Where(c => c.CourseId == id).ToListAsync();
                
                if (materials is null )
                    throw new Exception($"Course with Id '{id}' not found.");
            serviceResponse.Data = materials.Select(c => _mapper.Map<GetCourseMaterialDto>(c)).ToList();;
            return serviceResponse;
        }
    }
}