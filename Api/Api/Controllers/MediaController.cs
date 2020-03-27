using Api.Core.Business.Filters;
using Api.Core.Common.Helpers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/media")]
    //[EnableCors("CorsPolicy")]
    public class MediaController : Controller
    {
        // UPLOAD
        //[HttpPost]
        //[Route("{id:Guid}")]
        //public async Task<IActionResult> Post([FromRoute]Guid id, [FromForm]IFormFile body)
        //{
        //    byte[] fileBytes;
        //    using (var memoryStream = new MemoryStream())
        //    {
        //        await body.CopyToAsync(memoryStream);
        //        fileBytes = memoryStream.ToArray();
        //    }

        //    var filename = body.FileName;
        //    var contentType = body.ContentType;

        //    SaveFileToDatabase(id, fileBytes, filename, contentType);

        //    return Ok();
        //}

        //private void SaveFileToDatabase(Guid id, byte[] fileBytes, string filename, string contentType)
        //{

        //    throw new NotImplementedException();
        //}

        [HttpPost]
        [CustomAuthorize]
        public async Task<IActionResult> UploadMedia(string folder, string fileName, IFormFile file)
        {
            var t1 = Task.Run(() => FileHelper.SaveFile(folder, fileName, file));

            await Task.WhenAll(t1);

            var extension = Path.GetExtension(file.FileName);

            return Ok(Url.Action("GetFile", "Media", new { folder = folder, fileName = string.Format("{0}{1}", fileName, extension) }));
        }

        [HttpGet("{folder}/{fileName}")]
        public async Task<IActionResult> GetFile(string folder, string fileName)
        {
            var t1 = Task.Run(() => FileHelper.GetFile(folder, fileName));

            await Task.WhenAll(t1);

            var fileStream = System.IO.File.OpenRead(t1.Result);

            string contentType = GetMimeType(fileName);

            return base.File(fileStream, contentType);
        }

        private string GetMimeType(string fileName)
        {
            string mimeType = "application/unknown";
            string ext = System.IO.Path.GetExtension(fileName).ToLower();
            Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext);
            if (regKey != null && regKey.GetValue("Content Type") != null)
                mimeType = regKey.GetValue("Content Type").ToString();
            return mimeType;
        }

    }
}
